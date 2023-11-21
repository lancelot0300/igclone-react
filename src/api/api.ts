import axios from "axios";
import {
  IComment,
  IPost,
  IPostsResponse,
  IResponse,
} from "../interfaces/interfaces";
import { InfiniteData, QueryClient, QueryObserverResult } from "react-query";

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

  queryClient.setQueryData<InfiniteData<IResponse>>(["posts"], (oldData) => {
    if (!oldData) return {
      pageParams: [],
      pages: [],
    };
  
    return {
      pageParams: oldData.pageParams,
      pages: oldData.pages.map((page) => {
        return {
          ...page,
          posts: page.posts.filter((post) => post._id !== _id),
        };
      },
      ),
    };
  });
}

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

    queryClient.setQueryData<InfiniteData<IResponse>>(["posts"], (oldData) => {
      if (!oldData) return {
        pageParams: [],
        pages: [],
      };
    
      return {
        pageParams: oldData.pageParams,
        pages: oldData.pages.map((page) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: post.comments.filter((com) => com._id !== id),
              };
            }
            return post;
          }),
        })),
      };
    });

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

    queryClient.setQueryData<InfiniteData<IResponse>>(["posts"], (oldData) => {
      if (!oldData) return {
        pageParams: [],
        pages: [],
      };
    
      return {
        pageParams: oldData.pageParams,
        pages: oldData.pages.map((page) => {
          return {
            ...page,
            posts: page.posts.map((post) => {
              if (post._id === postId) {
                return {
                  ...post,
                  comments: [...post.comments, newComment],
                };
              }
              return post;
            }),
          };
        }),
      };
    }
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

    queryClient.setQueryData<InfiniteData<IResponse>>(["posts"], (oldData) => {
      if (!oldData) return {
        pageParams: [],
        pages: [],
      };
    
      return {
        pageParams: oldData.pageParams,
        pages: oldData.pages.map((page) => {
          return {
            ...page,
            posts: page.posts.map((post) => {
              if (post._id === postId) {
                return {
                  ...post,
                  likes: res.data,
                };
              }
              return post;
            }),
          };
        }),
      };
    }
    );
  }
  catch (error) {
    setLikes(oldLikes);
    setIsLiked(isLiked);
  }
 
};
