import {  ILikes, IPostResponse, IUser } from "../../interfaces/interfaces";
import { Options, StyledPost, StyledPostImage, StyledTrash, StyledUser } from "./Post.styles";
import Image from "../PostImage/PostImage";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import withLike from "../WithLike/withLike";
import { removePost } from "../../api/api";

interface IProps {
  postData: IPostResponse;
}


  interface IProps {
    postData: IPostResponse;
    handleLikeClick: () => void;
    user: IUser | null;
    setLiked: React.Dispatch<React.SetStateAction<boolean>>;
    liked: boolean;
    likes: string[];
  }

const Post = ({ postData, handleLikeClick, user, setLiked, liked, likes }: IProps) => {
  const queryClient = useQueryClient();
  const { photo, desc, _id } = postData;

  const { photoURL, displayName, email, _id: commentUserId } = postData.user || ({});



  if(!postData) return null

  return (
      <StyledPost>
        <StyledUser>
          <Link to={`/profile/${postData.user?._id || "not-found"}`}>
            <Image width="50px" height="50px" src={photoURL || "https://maszaweb.pl:8880/uploads/defaults/young-businessman-icon.png"} alt="user" />
          </Link>
          <span>{displayName || email || "Deleted User"}</span>
        </StyledUser>

        <StyledPostImage
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
          user?._id === postData.user?._id && <StyledTrash  onClick={() => removePost(_id, queryClient)} src={`${process.env.REACT_APP_FETCH_PHOTOS}/uploads/defaults/recycle-bin-line-icon.png`}  alt="" />
         } 

        </Options>

        <Description userName={displayName || email} desc={desc} photoURL={photoURL} userId={commentUserId} />
        <Comments post={postData} commentsArr={postData.comments} />
      </StyledPost>
  );
};

export default withLike(Post);