import {  ILikes, IPostResponse, IUser } from "../../interfaces/interfaces";
import { StyledPost, StyledUser } from "./Post.styles";
import Image from "../PostImage/PostImage";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";
import styled from "styled-components";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import withLike from "../WithLike/withLike";
import { removePost } from "../../api/api";

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

  interface IProps {
    postData: IPostResponse;
    handleLikeClick: () => void;
    user: IUser | null;
    setLiked: React.Dispatch<React.SetStateAction<boolean>>;
    liked: boolean;
    likes: ILikes[];
  }

const Post = ({ postData, handleLikeClick, user, setLiked, liked }: IProps) => {
  const queryClient = useQueryClient();
  const { photo, desc, likes, _id } = postData;

  const { photoURL, displayName, email } = postData.user || ({});



  if(!postData) return null

  return (
      <StyledPost>
        <StyledUser>
          <Link to={`/profile/${postData.user?._id || "not-found"}`}>
            <Image width="50px" height="50px" src={photoURL || "https://maszaweb.pl:8880/uploads/defaults/young-businessman-icon.png"} alt="user" />
          </Link>
          <span>{displayName || email || "Deleted User"}</span>
        </StyledUser>

        <PostImage
          src={photo}
          onLikeFunc={handleLikeClick}
          setLiked={setLiked}
          alt="test"
        />
        <Options>
          <Likes
            likes={likes}
            liked={liked}
            handleClick={handleLikeClick}
            disabled={!user}
          />
          
         {
          user?._id === postData.user?._id && <StyledTrash  onClick={() => removePost(_id, queryClient)} src="https://maszaweb.pl:8880/uploads/defaults/recycle-bin-line-icon.png" alt="" />
         } 

        </Options>

        <Description userName={displayName || email} desc={desc} photoURL={photoURL} />
        <Comments post={postData} commentsArr={postData.comments} />
      </StyledPost>
  );
};

export default withLike(Post);