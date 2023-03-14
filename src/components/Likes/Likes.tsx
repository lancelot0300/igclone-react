import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../../config/config";
import { ILike } from "../../interfaces/interfaces";
import { RootState } from "../../state/store";
import Like from "../Like/Like";

interface IProps {
  likes: ILike[] | undefined;
  postId: string;
}

const StyledLikes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 5px 10px;
  gap: 10px;
    p {
        font-size: 1rem;
        font-weight: 600;
    }
`;

const Likes: FC<IProps> = ({ likes, postId }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [liked, setLiked] = React.useState(
    likes?.find((like) => like.userId === user.uid) ? true : false
  );
  const [likesCount, setLikesCount] = React.useState(likes?.length || 0);
  const docRef = doc(db, "posts", postId);

  const handleClick = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
      updateDoc(docRef, { likes: arrayRemove({ userId: user.uid }) });
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
      updateDoc(docRef, { likes: arrayUnion({ userId: user.uid }) });
    }
  };

  return (
    <StyledLikes>
      <Like isLiked={liked} onClick={handleClick}></Like>
      <p>{likesCount} <b>Likes</b></p>
    </StyledLikes>
  );
};

export default Likes;
