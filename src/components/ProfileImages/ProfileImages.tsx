import { FC } from "react";
import styled from "styled-components";
import { IPostResponse } from "../../interfaces/interfaces";

interface IProps {
  post: IPostResponse;
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

export const ProfileImages: FC<IProps> = ({ post }) => {

  return (
    <Wrapper>
      <StyledImage src={post.photo || ""} alt="test" width="150px" height="150px" />
    </Wrapper>
  );
};
