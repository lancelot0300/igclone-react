import { FC } from "react";
import styled from "styled-components";
import { IPostsResponse } from "../../interfaces/interfaces";

interface IProps {
  post: IPostsResponse;
  onClick?: () => void;
}

const StyledImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
object-position: center;
overflow: hidden;
`;
const Wrapper = styled.div`
  aspect-ratio: 9/10;
`;

export const ProfileImages: FC<IProps> = ({ post, onClick }) => {

  return (
    <Wrapper>
      <StyledImage src={post.photo || ""} alt="test" width="150px" height="150px" onClick={onClick} />
    </Wrapper>
  );
};
