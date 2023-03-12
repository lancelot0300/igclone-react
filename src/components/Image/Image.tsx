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
  width?: string;
  height?: string;
}

const Image: FC<IProps> = ({ src, alt, width, height }) => {
  return (
      <StyledImage width={width} height={height} src={src} alt={alt} />
  );
};

export default Image;
