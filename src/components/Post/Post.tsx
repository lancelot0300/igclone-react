import { FC} from "react";
import { IData} from "../../interfaces/interfaces";
import { StyledPost, StyledUser} from "./Post.styles";
import Image from "../Image/Image";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {useLikes} from "../../hooks/useLikes";


interface IProps {
  postData: IData ;
}

export const Post: FC<IProps> = ({postData}) => {

  const { user } = useSelector((state: RootState) => state.auth);
  const {desc, photo, userPhoto,likes, userName } = postData.data;
  const {liked, likesCount, handleLike, handleDoubleLike } = useLikes(likes, postData.id, user?.uid);

  return (
    <StyledPost>
      <StyledUser>
        <Image width="50px" height="50px" src={userPhoto} alt="user" />
        <span>{userName}</span>
      </StyledUser>
      <Image src={photo} onClick={handleDoubleLike} alt="test"/>
      <Likes likesCount={likesCount} handleClick={handleLike}  liked={liked}/>
      <Description userName={userName} desc={desc}></Description>
    </StyledPost>
  );
};
