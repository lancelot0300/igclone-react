import { FC, useEffect } from "react";
import { IPostResponse } from "../../interfaces/interfaces";
import { Post } from "../../components/Post/Post";
import { useFetch } from "../../hooks/useFetch";


export const Home: FC = () => {

  const {data, error} = useFetch<IPostResponse[]>("/posts");

  if(error) {
    return <h1>Something went wrong</h1>
  }

  if(!data) {
    return <h1>Loading...</h1>
  }

  if(data.length === 0) {
    return <h1>No posts</h1>
  }

  return (
    <>
      {data.map((post) => {
        return <Post postData={post} key={post._id} />;
      })}
    </>
  );
};
