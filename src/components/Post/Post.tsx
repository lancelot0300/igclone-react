import { FC, useEffect, useReducer, useRef, useState } from "react";
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
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";

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

export const Post: FC<IProps> = ({ postData }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { photo, desc, likes, _id } = postData;

  const { photoURL, displayName, email } = postData.user;

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [isOpenComments, setIsOpenComments] = useState(false);

  useEffect(() => {
    const initialLiked = likes.some((like) => like === user?._id);
    setLiked(initialLiked);
    setLikesCount(likes.length);
  }, [likes, user]);

  const handleLikeClick = async () => {
    if (!user) return;

    const newLikesCount = liked ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikesCount);
    setLiked((prev) => !prev);

    try {
      await axios.put(
        process.env.REACT_APP_FETCH_APP + `/posts/likePost/${_id}`,
        null,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      setLiked((prev) => !prev);
      setLikesCount(likesCount);
    }
  };

  const handleOpenComments = () => {
    setIsOpenComments(!isOpenComments);
  };

  return (
    <>
    {
      console.log('render:' + postData._id)
    }
      <StyledPost>
        <StyledUser>
          <Link to={`/profile/${postData.user._id}`}>
            <Image width="50px" height="50px" src={photoURL || ""} alt="user" />
          </Link>
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
          {user && (
            <AddCommentButton onClick={handleOpenComments}>
              {isOpenComments ? "Close Add Comment" : "Add Comment"}
            </AddCommentButton>
          )}
        </Options>
        <Description userName={displayName || email || ""} desc={desc} />
        <Comments postId={postData._id} commentsArr={postData.comments} />
      </StyledPost>
    </>
  );
};
