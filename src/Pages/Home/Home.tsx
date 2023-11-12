import { FC, useEffect } from "react";
import { IPostResponse } from "../../interfaces/interfaces";
import Post from "../../components/Post/Post";
import { useFetch } from "../../hooks/useFetch";


export const Home: FC = () => {

  const {data, isError, isLoading} = useFetch<IPostResponse[]>("/posts", "posts");

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    console.log(isError)
    return <div>Error...</div>
  }


  return (
    <>
      {data?.map((post) => {
        return <Post postData={post} key={post._id} />;
      })}
    </>
  );
};
