import { FC, useEffect} from "react";
import { IData } from "../../interfaces/interfaces";
import { Post } from "../../components/Post/Post";
import usePosts from "../../hooks/usePosts";

export const Home: FC = () => {
  const {posts, getPosts} = usePosts();

  const renderPosts = (posts: IData[]) => {
    if (posts) {
      return posts.map((post) => <Post key={post.id} data={post} />);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts();
    };
    fetchPosts();
  }, [getPosts]);

  return <>{renderPosts(posts)}</>;
};
