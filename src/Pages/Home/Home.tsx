import { collection, getDocs } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { db } from "../../config/config";
import { IData, IPost } from "../../interfaces/interfaces";
import { Post } from "../../components/Post/Post";

export const Home: FC = () => {
  const [posts, setPosts] = useState<IData[]>([]);

  const getPosts = async () => {
    const postsColl = collection(db, "posts");
    const querySnapshot = await getDocs(postsColl);
    const posts: IData[] = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        data: doc.data() as IPost,
      });
    });
    return posts;
  };

  const sortPosts = (posts: IData[]) => {
    posts.sort((a, b) => {
      return (
        new Date(b.data.createdAt).getTime() -
        new Date(a.data.createdAt).getTime()
      );
    });
  };

  const renderPosts = (posts: IData[]) => {
    if (posts) {
      return posts.map((post) => <Post key={post.id} data={post} />);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      sortPosts(posts);
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return <>{renderPosts(posts)}</>;
};
