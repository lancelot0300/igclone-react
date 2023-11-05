import { FC, useEffect, useRef, useState } from "react";
import { IComment, IPostResponse, IUser } from "../../interfaces/interfaces";
import { StyledPost, StyledUser } from "./Post.styles";
import Image from "../Image/Image";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import styled from "styled-components";
import { useTwoFetches } from "../../hooks/useTwoFetches";
import Comments from "../Comments/Comments";

interface IProps {
  postData: IPostResponse;
}

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`;

const AddCommentButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgb(0, 149, 246);
  }
`;

const AddComment = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;

  input {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 0 10px;
  }

  button {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    right: 25px;
    color: black;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: rgb(0, 149, 246);
    }
  }
`;

export const Post: FC<IProps> = ({ postData }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { photo, desc, likes, user: userRef, _id } = postData;
  const { data: userData } = useFetch<IUser>(`/users/${userRef}`);

  const { photoURL, displayName, email } = userData || {};

  const initialLiked = likes.some((like) => like === user?._id);
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(likes.length);

  const [isOpenComments, setIsOpenComments] = useState(false);

  const commentRef = useRef<HTMLInputElement>(null);

  const [comments, setComments] = useState<IComment[]>([]);

  const handleLikeClick = async () => {
    const newLikesCount = liked ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikesCount);
    setLiked(!liked);

    try {
      await axios.put(process.env.REACT_APP_FETCH_APP  + `/posts/likePost/${_id}`, null, {
        withCredentials: true,
      });
    } catch (error) {
      setLiked(initialLiked);
      setLikesCount(likesCount);
    }
  };

  const handleOpenComments = () => {
    setIsOpenComments(!isOpenComments);
  };

  const handleAddComment = async () => {
    const comment = commentRef.current?.value;
    if (!comment) return;
    const newComments = [
      ...comments,
      {
        comment,
        user: {
          _id: user?._id,
          displayName: user?.displayName,
          email: user?.email,
        },
        _id: Math.random().toString()
      },
    ];
    setComments(newComments as IComment[]);
    try {
      await axios.put(
        process.env.REACT_APP_FETCH_APP  + `/posts/commentPost/${postData._id}`,
        { comment },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      setComments(comments);
    }
  };

  return (
    <>
      <StyledPost>
        <StyledUser>
          <Image width="50px" height="50px" src={photoURL || ""} alt="user" />
          <span>{displayName || email}</span>
        </StyledUser>
        <Image
          src={photo}
          onLikeFunc={handleLikeClick}
          setLiked={setLiked}
          alt="test"
        />
        <Options>
          <Likes
            likesCount={likesCount}
            liked={liked}
            handleClick={handleLikeClick}
            disabled={!user}
          />
         { user && <AddCommentButton onClick={handleOpenComments}>
            {isOpenComments ? "Close Add Comment" : "Add Comment"}
          </AddCommentButton>}
        </Options>
        <Description userName={displayName || email || ""} desc={desc} />
        <Comments
          postID={postData._id}
          comments={comments}
          setComments={setComments}
        />
        {isOpenComments && (
          <AddComment>
            <input ref={commentRef} type="text" placeholder="Add comment..." />
            <button onClick={handleAddComment}>Send</button>
          </AddComment>
        )}
      </StyledPost>
    </>
  );
};
