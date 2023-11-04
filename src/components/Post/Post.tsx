import { FC, useState } from "react";
import { IPostResponse, IUser } from "../../interfaces/interfaces";
import { StyledPost, StyledUser } from "./Post.styles";
import Image from "../Image/Image";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import styled from "styled-components";

interface IProps {
  postData: IPostResponse;
}

const StyledComments = styled.div`
  width: 100%;
  background-color: rgb(60, 59, 59);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap:2px;
`;

const StyledComment= styled.div`
  width: 100%;
  height: 30px;
  background-color: rgb(60, 59, 59);
  color: white;
`;

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
  const { photo, desc, likes, userID, _id } = postData;

  const { data } = useFetch<IUser>(`/users/getUser/${userID}`);
  const { photoURL, displayName, email } = data || {};

  const initialLiked = likes.some((like) => like === user?._id);
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(likes.length);

  const handleLikeClick = async () => {
    const newLikesCount = liked ? likesCount - 1 : likesCount + 1;
    setLikesCount(newLikesCount);
    setLiked(!liked);

    try {
      await axios.put(`https://maszaweb.pl:1256/api/posts/likePost/${_id}`, null, {
        withCredentials: true,
      });
    } catch (error) {
      setLiked(initialLiked);
      setLikesCount(likesCount);
    }
  };



  return (
    <StyledPost>
      <StyledUser>
        <Image width="50px" height="50px" src={photoURL || ""} alt="user" />
        <span>{displayName || email}</span>
      </StyledUser>
      <Image src={photo} onLikeFunc={() => handleLikeClick()} setLiked={setLiked} alt="test" />
      <Options>
       <Likes likesCount={likesCount} liked={liked} handleClick={handleLikeClick} disabled={!user} />
       <AddCommentButton>Add Comment</AddCommentButton>
      </Options>
      <Description userName={displayName || email || ""} desc={desc}></Description>
      <StyledComments>
        <StyledComment>
          Masza221 : Super zdjęcie!
       </StyledComment>
        <StyledComment>
          Masza221 : Super zdjęcie!
       </StyledComment>
        <StyledComment>
          Masza221 : Super zdjęcie!
       </StyledComment>
      </StyledComments>
    </StyledPost>
  );
};
