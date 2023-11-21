import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { FileDropArea, FileInput, FileMessage, StyledInput } from "../../components/Input/Input.styles";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { IPost } from "../../interfaces/interfaces";
import { createPost, sendFile } from "../../api/api";
import { CreatePostSchema, isValidFileType } from "../../scheama/createPostSchema";

const CreatePost = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const [wait, setWait] = useState(false);
  const [photoState, setPhotoState] = useState<File | undefined>();
  const navigate = useNavigate();
  const fileMutation = useMutation(sendFile);
  const postMutation = useMutation(createPost);

  interface FormValues {
    desc: string;
    photo: File | undefined;
  }

  const onSubmit = async ({ desc, photo }: FormValues) => {
    if (!photo || !user) return;

    setWait(true);
    const res = await fileMutation.mutateAsync(photo)
    .catch((err) => {
      console.log(err);
      setWait(false);
    }
    );
    const post: IPost = {
      desc,
      photo: res.fileUrl,
    };

    const res2 = await postMutation.mutateAsync(post)
    .catch((err) => {
      console.log(err);
      setWait(false);
    }
    );

    if (res2) {
      queryClient.invalidateQueries("posts");
    }

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
    validationSchema: CreatePostSchema,
    onSubmit,
  });

  const showPreview = (file: File) => {
    if (!isValidFileType(file.name, file.type)) return null;
    return (
      <>
        <img width="100px" height="100px" src={URL.createObjectURL(file)} alt="Preview" />
        <p>{(file.size / (1024 * 1024)).toFixed(1)}MB</p>
      </>
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          $isError={errors.desc && touched.desc}
          type="text"
          placeholder="Type a description for your post"
          name="desc"
          value={values.desc}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FileMessage $isError={errors.desc && touched.desc}>{touched.desc && errors.desc}</FileMessage>
        {photoState && showPreview(photoState)}
        <FileDropArea $isError={errors.photo && touched.photo}>
          <FileMessage $isError={errors.photo && touched.photo}>
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
