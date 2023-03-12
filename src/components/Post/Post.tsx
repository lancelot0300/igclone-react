import { FC} from "react";
import { IData } from "../../interfaces/interfaces";
import { StyledPost, StyledTitle } from "./Post.styles";
import Image from "../Image/Image";

interface IProps {
  data: IData ;
}



export const Post: FC<IProps> = ( {data}) => {

  const {title, desc, photo} = data.data;


  return (
    <StyledPost>
      <StyledTitle>{title}</StyledTitle>
      {desc}
      { photo && <Image src={photo} alt=""/>}
    </StyledPost>
  );
};
