import { IPostResponse } from "../../interfaces/interfaces";
import Post from "../../components/Post/Post";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";

export const Home = () => {
  const { data, isError, isLoading, refetch } = useFetch<IPostResponse[]>("/posts/", "posts");


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(isError);
    return <div>Error...</div>;
  }

  return (
    <>
      {data?.map((post) => {
        return <Post postData={post} key={post._id} />;
      })}
    </>
  );
};
