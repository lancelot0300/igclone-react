import { FC } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-height: 900px;
  object-fit: cover;
  object-position: center;
`;

interface IProps {
  src: string;
  alt: string;
}

const Image: FC<IProps> = ({ src, alt }) => {
  return (
      <StyledImage src={src} alt={alt} />
  );
};

export default Image;
