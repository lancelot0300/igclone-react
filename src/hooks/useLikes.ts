import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/config";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { ILike } from "../interfaces/interfaces";

export const useLikes = (likes: ILike[] = [], postId: string, uid: string) => {
  const [liked, setLiked] = useState(
    likes?.some((like) => like.userId === uid)
  );
  const [likesCount, setLikesCount] = useState(likes.length || 0);
  const docRef = doc(db, "posts", postId);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
      updateDoc(docRef, { likes: arrayRemove({ userId: uid }) });
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      updateDoc(docRef, { likes: arrayUnion({ userId: uid }) });
    }
  };

  const handleDoubleLike = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.detail === 2) {
      if (liked) return;
      handleLike();
    }
  };

  return { liked, likesCount, handleLike, handleDoubleLike };
};
