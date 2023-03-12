import { FC, useEffect} from "react";
import { IData } from "../../interfaces/interfaces";
import { StyledPost, StyledUser, StyledUserName } from "./Post.styles";
import Image from "../Image/Image";
import { collection } from "firebase/firestore";


interface IProps {
  data: IData ;
}



export const Post: FC<IProps> = ( {data}) => {

  const {desc, photo} = data.data;


  return (
    <StyledPost>
      <StyledUser>
        <Image width="50px" height="50px" src={data.data.userPhoto} alt="user" />
        <span>{data.data.userName}</span>
      </StyledUser>
      { photo && <Image src={photo} alt=""/>}
      {desc && <p><StyledUserName>{data.data.userName}</StyledUserName>: {desc}</p>}
    </StyledPost>
  );
};
