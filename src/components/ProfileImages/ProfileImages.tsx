import { FC } from "react";
import styled from "styled-components";
import { IData } from "../../interfaces/interfaces";
import Image from "../Image/Image";

interface IProps {
  data: IData;
}

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1/1;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const ProfileImages: FC<IProps> = ({ data }) => {
  const { photo } = data.data;

  return (
    <Wrapper>
      <StyledImage src={photo} alt="test" width="150px" height="150px" />
    </Wrapper>
  );
};
