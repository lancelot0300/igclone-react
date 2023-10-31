import { FC} from "react";
import { IData, IPost, IPostResponse, IUser} from "../../interfaces/interfaces";
import { StyledPost, StyledUser} from "./Post.styles";
import Image from "../Image/Image";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useFetch } from "../../hooks/useFetch";
// import {useLikes} from "../../hooks/useLikes";


interface IProps {
  postData: IPostResponse ;
}

export const Post: FC<IProps> = ({postData}) => {

  const { user } = useSelector((state: RootState) => state.auth);

  const { photo, desc, likes } = postData;

  function handleDoubleLike(event: any): void {

    throw new Error("Function not implemented.");
  }
  const liked = false;
  const likesCount = likes?.length || 0;
  function handleLike(): void {
    throw new Error("Function not implemented.");
  }

  const { data } = useFetch<IUser>(`/users/getUser/${postData.userId}`);
  const { photoURL, displayName, email } = data || {};

  // const {liked, likesCount, handleLike, handleDoubleLike } = useLikes(likes, postData.id, user?.uid);
  return (
    <StyledPost>
      <StyledUser>
        <Image width="50px" height="50px" src={photoURL || ""} alt="user" />
        <span>{displayName || email }</span>
      </StyledUser>
      <Image src={photo} onClick={handleDoubleLike} alt="test"/>
      <Likes likesCount={likesCount} handleClick={handleLike}  liked={liked}/>
      <Description userName={displayName|| email || ""} desc={desc}></Description>
    </StyledPost>
  );
};
