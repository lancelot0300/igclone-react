import { FC, useEffect, useReducer, useRef, useState } from "react";
import { IComment, IPostResponse, IUser } from "../../interfaces/interfaces";
import { StyledPost, StyledUser } from "./Post.styles";
import Image from "../Image/Image";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import axios from "axios";
import styled from "styled-components";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";

interface IProps {
  postData: IPostResponse;
}

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`;

const PostImage = styled(Image)`
aspect-ratio: 9/10;
object-fit: cover;
object-position: center;
overflow: hidden;

`;

const StyledTrash = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: transparent;
  margin-right: 10px;
  margin-top: 5px;
  `;

export const Post: FC<IProps> = ({ postData }) => {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  const { photo, desc, likes, _id } = postData;

  const { photoURL, displayName, email } = postData.user;

  const [liked, setLiked] = useState(postData.likes.some((like) => like === user?._id));
  const [likesCount, setLikesCount] = useState(likes.length);


  const removePost = async () => {

    try {
      await axios.delete(
        process.env.REACT_APP_FETCH_APP + `/posts/${_id}`,
        {
          withCredentials: true,
        }
      );

    } catch (error) {
      return console.log(error);
    }

    queryClient.setQueryData<IPostResponse[]>("posts", (oldData) => {
      if (!oldData) return [];
      return oldData.filter((post) => post._id !== _id);
    }
    );

  }


  const handleLikeClick = async () => {
    if (!user) return;

    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevLikesCount) => (liked ? prevLikesCount - 1 : prevLikesCount + 1));


    try {
      await axios.put(
        process.env.REACT_APP_FETCH_APP + `/posts/likePost/${_id}`,
        null,
        {
          withCredentials: true,
        }
      );

    } catch (error) {
      setLiked(liked)
      setLikesCount(likes.length)
    }


    const newLikes = liked ? likes.filter((like) => like !== user._id) : [...likes, user._id];

    queryClient.setQueryData<IPostResponse[]>("posts", (oldData) => {
      if (!oldData) return [];
      return oldData.map((post) => {
        if (post._id === _id) {
          return { ...post, likes: newLikes };
        }
        return post;
      });
    }
    );
  
  };

  if(!postData) return null

  return (
    <>
      <StyledPost>
        <StyledUser>
          <Link to={`/profile/${postData.user._id}`}>
            <Image width="50px" height="50px" src={photoURL || ""} alt="user" />
          </Link>
          <span>{displayName || email}</span>
        </StyledUser>

        <PostImage
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
          
         {
          user && <StyledTrash  onClick={removePost} src="https://maszaweb.pl:8880/uploads/defaults/recycle-bin-line-icon.png" alt="" />
         } 

        </Options>

        <Description userName={displayName || email} desc={desc} photoURL={photoURL} />
        <Comments postId={postData._id} commentsArr={postData.comments} />
      </StyledPost>
    </>
  );
};
