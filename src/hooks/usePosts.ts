import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/config";
import { IData, IPost } from "../interfaces/interfaces";

const usePosts = () => {
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
     sortPosts(posts);
     setPosts(posts); 
    };

    const getUserPosts = async (userId: string) => {
        const postsColl = collection(db, "posts");
        const querySnapshot = await getDocs(postsColl);
        const posts: IData[] = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().userId !== userId) return;
            posts.push({
                id: doc.id,
                data: doc.data() as IPost,
            });
        });
        sortPosts(posts);
        setPosts(posts);
    };
  
    const sortPosts = (posts: IData[]) => {
      posts.sort((a, b) => {
        return (
          new Date(b.data.createdAt).getTime() -
          new Date(a.data.createdAt).getTime()
        );
      });
    };
    return { posts, setPosts, getPosts, getUserPosts };
};
export default usePosts;
