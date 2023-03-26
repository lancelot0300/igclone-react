import { useState } from "react";
import {
  FileDropArea,
  FileInput,
  FileMessage,
  StyledInput,
} from "../../components/Input/Input.styles";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import * as yup from "yup";
import { IPost } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useNavigate } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import {useFormik } from "formik";

const CreatePost = () => {
  const [wait, setWait] = useState(false);
  const [photoState, setPhotoState] = useState<File>();
  const { uploadFile, uploadDoc } = useFirebase();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 5242880; //5MB
  const validFileExtensions = [
    "jpg",
    "gif",
    "png",
    "jpeg",
    "svg",
    "webp",
    "bmp",
    "heif",
    "heic",
  ];

  const isValidFileType = (fileName: string, fileType: string) => {
    const extension = fileName.split(".").pop();
    return (
      validFileExtensions.includes(extension || "") &&
      fileType.startsWith("image/")
    );
  };

  interface FormValues {
    desc: string;
    photo: File | undefined;
  }

  const onSubmit = async ({ desc, photo }: FormValues) => {
    setWait(true);
    const photoUrl = await uploadFile(photo!, user?.uid);
    const post: IPost = {
      desc,
      userId: user?.uid,
      userPhoto: user?.photoURL,
      userName: user?.displayName || "",
      photo: photoUrl,
      createdAt: new Date().toISOString(),
    };
    await uploadDoc("posts", post);
    setWait(false);
    navigate("/");
  };

  const {
    values,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik<FormValues>({
    initialValues: {
      desc: "",
      photo: undefined,
    },
    validationSchema: yup.object({
      desc: yup.string().required("Description is required"),
      photo: yup
        .mixed()
        .required("Photo is required")
        .test(
          "is-valid-type",
          "Not a valid image type",
          (value) => value && isValidFileType(value.name, value.type)
        )
        .test(
          "is-valid-size",
          "File size is too large",
          (value) => value && value.size <= MAX_FILE_SIZE
        ),
    }),
    onSubmit,
  });

  const showPreview = (file: File) => {
     if(!isValidFileType(file.name, file.type)) return null;
      return (
        <>
          <img
            width="100px"
            height="100px"
            src={URL.createObjectURL(file)}
            alt="Preview"
          />
          <p>{(file.size / (1024 * 1024)).toFixed(1)}MB</p>
        </>
      );
  };

  console.log(errors);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          $isError={errors.desc ? true : false}
          type="text"
          placeholder="Type a description for your post"
          name="desc"
          value={values.desc}
          onChange={handleChange}
        />
        <FileMessage $isError={ errors.desc ? true : false}>{errors.desc}</FileMessage>
        {photoState && showPreview(photoState)}
        <FileDropArea $isError={errors.photo ? true : false}>
          <FileMessage $isError={ errors.photo ? true : false}> {errors.photo ? errors.photo : "Drag and Drop"}</FileMessage>
          <FileInput
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => {
              setFieldValue("photo", e.target.files![0]);
              setPhotoState(e.target.files![0]);
            }}
            onBlur={handleBlur}
          />
        </FileDropArea>
        <Button disabled={wait} type="submit">
          Create Post
        </Button>
      </Form>
    </>
  );
};

export default CreatePost;
