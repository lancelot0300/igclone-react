import { FC } from "react";
import { IData } from "../../interfaces/interfaces";
import { Post } from "../../components/Post/Post";
import usePosts from "../../hooks/usePosts";

export const Home: FC = () => {
  const { postsState } = usePosts();

  const renderPosts = (posts: IData[]) => {
    if (posts) {
      return posts.map((post) => <Post key={post.id} postData={post} />);
    }
  };

  return <>{renderPosts(postsState)}</>;
};
