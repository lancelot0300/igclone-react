import { FC} from "react";
import { IData} from "../../interfaces/interfaces";
import { StyledPost, StyledUser} from "./Post.styles";
import Image from "../Image/Image";
import Likes from "../Likes/Likes";
import Description from "../Description/Description";


interface IProps {
  data: IData ;
}

export const Post: FC<IProps> = ({data}) => {

  const {desc, photo, userPhoto,likes, userName } = data.data;

  return (
    <StyledPost>
      <StyledUser>
        <Image width="50px" height="50px" src={userPhoto} alt="user" />
        <span>{data.data.userName}</span>
      </StyledUser>
      <Image src={photo} alt="test"/>
      <Likes likes={likes} postId={data.id} />
      <Description userName={userName} desc={desc}></Description>
    </StyledPost>
  );
};
