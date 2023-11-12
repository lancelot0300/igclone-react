import axios from "axios";
import { IPost, IPostResponse } from "../interfaces/interfaces";
import { QueryClient, useMutation } from "react-query";


export const createPost = async (post: IPost) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_FETCH_APP  + "/posts/createPost",
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

  export const addComment = (text: string) => {
        try 
        {   
            const response = axios.post(process.env.REACT_APP_FETCH_APP + "/posts/addComment", {
                text: "text",
                postID: "postID"
            }, {
                withCredentials: true
            })
        }
        catch (error) 
        {
            
        }
      }

      export const registerUser = async ({ email, password }: { email: string, password: string }) => {
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
      }


     export const removePost = async (_id: string, queryClient: QueryClient ) => {
        try {
          await axios.delete(
            process.env.REACT_APP_FETCH_APP + `/posts/${_id}`,
            {
              withCredentials: true,
            }
          );
    
        } catch (error) {
          return console.log(error);
        }
    
        queryClient.setQueryData<IPostResponse[]>("posts", (oldData) => {
          if (!oldData) return [];
          return oldData.filter((post) => post._id !== _id);
        }
        );
      }