import axios from "axios";
import {
  IComment,
  ILikes,
  IPost,
  IPostResponse,
} from "../interfaces/interfaces";
import { QueryClient } from "react-query";

export const createPost = async (post: IPost) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_FETCH_APP + "/posts/createPost",
      post,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Adding post failed");
  }
};

export const sendFile = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      process.env.REACT_APP_FETCH_APP + "/upload/uploadFile",
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
    throw new Error("Uploading photo faild");
  }
};

export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_FETCH_APP + "/auth/register",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Register failed");
  }
};

export const removePost = async (_id: string, queryClient: QueryClient) => {
  try {
    await axios.delete(process.env.REACT_APP_FETCH_APP + `/posts/${_id}`, {
      withCredentials: true,
    });
  } catch (error) {
    return console.log(error);
  }

  queryClient.setQueryData<IPostResponse[]>("posts", (oldData) => {
    if (!oldData) return [];
    return oldData.filter((post) => post._id !== _id);
  });
};

export const removeComment = async (
  id: string,
  postId: string,
  queryClient: QueryClient,
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>
) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_FETCH_APP}/posts/commentRemove/${id}`,
      {
        withCredentials: true,
      }
    );

    queryClient.setQueryData<IPostResponse[]>("posts", (oldData) =>
      oldData
        ? oldData.map((p) =>
            p._id === postId
              ? { ...p, comments: p.comments.filter((com) => com._id !== id) }
              : p
          )
        : []
    );

    setComments((prevComments) => prevComments.filter((com) => com._id !== id));
  } catch (error) {
    console.error(error);
  }
};

export const addComment = async (
  value: string,
  postId: string,
  queryClient: QueryClient,
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>
) => {
  if (!value) return;

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_FETCH_APP}/posts/commentPost/${postId}`,
      { comment: value },
      {
        withCredentials: true,
      }
    );

    const newComment = res.data.comment;

    queryClient.setQueryData<IPostResponse[]>("posts", (oldData) =>
      oldData
        ? oldData.map((p) =>
            p._id === postId
              ? { ...p, comments: [...p.comments, newComment] }
              : p
          )
        : []
    );

    setComments((prevComments) => [...prevComments, newComment]);
  } catch (error) {
    console.error(error);
  }
};

export const updateLikes = async (
  postId: string,
  newLikes: string[],
  oldLikes: string[],
  isLiked: boolean,
  queryClient: QueryClient,
  setLikes: React.Dispatch<React.SetStateAction<string[]>>,
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
) => {

  
  try {
    setLikes(newLikes);
    setIsLiked(!isLiked);
   const res =  await axios.put<string[]>(
      process.env.REACT_APP_FETCH_APP + `/posts/likePost/${postId}`,
      null,
      {
        withCredentials: true,
      }
    );

    queryClient.setQueriesData(
      "posts",
      (oldData: IPostResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((post) =>
          post._id === postId ? { ...post, likes: res.data} : post
        );
      }
    );
  }
  catch (error) {
    setLikes(oldLikes);
    setIsLiked(isLiked);
  }
 
};
