import { FC} from "react";
import { IData } from "../../interfaces/interfaces";
import { StyledPost, StyledTitle } from "./Post.styles";

interface IProps {
  data: IData ;
}



export const Post: FC<IProps> = ( {data}) => {

  const {title, body} = data.data;


  return (
    <StyledPost>
      <StyledTitle>{title}</StyledTitle>
      {body}
    </StyledPost>
  );
};
