import { FC, useEffect } from "react";
import { IPostResponse } from "../../interfaces/interfaces";
import { Post } from "../../components/Post/Post";
import { useFetch } from "../../hooks/useFetch";


export const Home: FC = () => {

  const {data, refetch} = useFetch<IPostResponse[]>("/posts");

    useEffect(() => {
      refetch();
    }
    , [refetch]);

  const renderPosts = (posts: IPostResponse[]) => {
      return posts.map((post) => {
        return <Post postData={post} key={post._id} />;
      });
  };

  return (
    <>
      {data ? renderPosts(data) : <h1>Loading...</h1>}
    </>
  );
};
