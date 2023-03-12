import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputWrapper } from "../../components/ChangeAvatar/ChangeAvatar.styles";
import { IPost } from "../../interfaces/interfaces";
import useUploadFile from "../../hooks/useUploadFile";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/config";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [wait, setWait] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const {uploadFile} = useUploadFile();
  const {user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

    const schema = yup.object().shape({
    desc: yup.string(),
    photo: yup.mixed().required("Photo is required"),
  });

  interface FormValues {
    title: string;
    desc: string;
    photo: File;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setWait(true);
      const url = await uploadFile(data.photo, user.uid);
        const post: IPost = {
        userName: user.displayName || user.email || "",
        desc: data.desc,
        photo: url,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        userPhoto: user.photoURL || "",
        };
        const dbRef = collection(db, "posts");
        await addDoc(dbRef, post)
    } catch (error) {
      if (error instanceof Error) {
        setError("desc", { type: "custom", message: error.message });
      }
    }
    navigate("/");
    setWait(false);
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setPhoto(file);
        setValue("photo", file);
        }
    };



  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} title="Create Post">
        <Input
          type="text"
          placeholder="Type a description for your post"
          name="desc"
          register={register}
          error={errors.desc?.message}
        />
        {photo && <img width="100px" height="100px" src={URL.createObjectURL(photo)} alt="preview" />}
        <InputWrapper>
          <span>Click or Drop File</span>
          <Input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            error={errors.photo?.message}
          />
        </InputWrapper>
        <Button disabled={wait} type="submit">
          Create Post
        </Button>
      </Form>
    </>
  );
};

export default CreatePost;
