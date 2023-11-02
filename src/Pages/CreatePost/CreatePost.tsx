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
import { useFormik } from "formik";
import { useMutation } from "react-query";
import axios from "axios";

const sendFile = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      "https://maszaweb.pl:1256/api/upload/uploadFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Uploading photo faild"); // Handle the error appropriately
  }
};

const createPost = async (post: IPost) => {
  try {
    const response = await axios.post(
      "https://maszaweb.pl:1256/api/posts/createPost",
      post
    );
    return response.data;
  } catch (error) {
    throw new Error("Adding post failed"); // Handle the error appropriately
  }
};

const CreatePost = () => {
  const [wait, setWait] = useState(false);
  const [photoState, setPhotoState] = useState<File>();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const fileMutation = useMutation(sendFile);
  const postMutation = useMutation(createPost);
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
    if (!photo || !user) return;
    setWait(true);
    const res = await fileMutation.mutateAsync(photo);
    const post: IPost = {
      desc,
      userId: user._id,
      photo: res.fileUrl,
    };
    await postMutation.mutateAsync(post);
    setWait(false);
    navigate("/");
  };

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
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
    if (!isValidFileType(file.name, file.type)) return null;
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
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          $isError={errors.desc && touched.desc ? true : false}
          type="text"
          placeholder="Type a description for your post"
          name="desc"
          value={values.desc}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FileMessage $isError={errors.desc && touched.desc ? true : false}>
          {touched.desc && errors.desc}
        </FileMessage>
        {photoState && showPreview(photoState)}
        <FileDropArea $isError={errors.photo && touched.photo ? true : false}>
          <FileMessage $isError={errors.photo && touched.photo ? true : false}>
            {errors.photo && touched.photo ? errors.photo : "Drag and Drop"}
          </FileMessage>
          <FileInput
            type="file"
            name="image"
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
