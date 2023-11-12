import { FC } from "react";
import styled from "styled-components";
import { IPost, IPostResponse } from "../../interfaces/interfaces";
import Image from "../PostImage/PostImage";

interface IProps {
  post: IPostResponse;
}

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
const Wrapper = styled.div`
  width: 100%;
`;

export const ProfileImages: FC<IProps> = ({ post }) => {

  return (
    <Wrapper>
      <StyledImage src={post.photo || ""} alt="test" width="150px" height="150px" />
    </Wrapper>
  );
};
