import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputWrapper } from "../../components/ChangeAvatar/ChangeAvatar.styles";
import { IPost } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";

const CreatePost = () => {
  const [wait, setWait] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const { uploadFile, uploadDoc } = useFirebase();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  
  const MAX_FILE_SIZE =  5242880; //5MB
  const validFileExtensions  = ["jpg", "gif", "png", "jpeg", "svg", "webp", "bmp", "heif", "heic"];

  const isValidFileType = (fileName : string, fileType :string) => {
    const extension = fileName.split(".").pop();
    return validFileExtensions.includes(extension || "") && fileType.startsWith("image/");
  }

  const schema = yup.object().shape({
    desc: yup.string(),
    photo: yup.mixed()
    .required("Photo is required")
    .test("is-valid-type", "Not a valid image type",
      value => value && isValidFileType(value.name, value.type))
    .test("is-valid-size", `Max allowed size is ${MAX_FILE_SIZE / (1024* 1024)}MB`,
      value => value && value.size <= MAX_FILE_SIZE),
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
      uploadDoc("/posts", post);
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

  const showPreview = (file: File) => {
   
    if(isValidFileType(file.name, file.type))
    {
      return (
        <>
        <img
            width="100px"
            height="100px"
            src={URL.createObjectURL(file)}
            alt="Preview"
          />
          <p>{(file.size / (1024* 1024)).toFixed(1)}MB</p>
        </>
        
      );
    }
    else
    {
      return (
        <p>Invalid file type</p>
      );
    }

  }

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
        {photo && showPreview(photo)}
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
