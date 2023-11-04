import axios from "axios";
import { IPost } from "../interfaces/interfaces";


export const createPost = async (post: IPost) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_FETCH_APP  + "/posts/createPost",
        post
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
      throw new Error("Uploading photo faild"); // Handle the error appropriately
    }
  };