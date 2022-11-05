import { FC} from "react";
import { IPost } from "../../interfaces/interfaces";
import { StyledPost, StyledTitle } from "./Post.styles";

interface IProps {
  post: IPost | undefined;
}



const Post: FC<IProps> = ( {post}) => {


  return (
    <StyledPost>
      <StyledTitle>{post?.title}</StyledTitle>
      {post?.body}
    </StyledPost>
  );
};

export default Post;
