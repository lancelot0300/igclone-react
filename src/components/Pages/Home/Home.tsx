import { collection, getDocs } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { db } from "../../../config/config";
import { IPost } from "../../../interfaces/interfaces";
import Post from "../../Post/Post";

export const Home: FC = () => {


  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    async function getUser() {
      const postsColl = collection(db, "posts");
      
     getDocs(postsColl).then((querySnapshot) => { 

        const posts: IPost[] = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data() as IPost);
        });
        setPosts(posts);
      });
    }
    getUser();
  }, []);

  return (
    <>
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
};
