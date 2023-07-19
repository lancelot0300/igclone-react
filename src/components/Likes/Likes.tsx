import { FC } from "react";
import styled from "styled-components";
import Like from "../Like/Like";

interface IProps {
  likesCount: number;
  handleClick: () => void;
  liked: boolean;
}

const StyledLikes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 5px 10px;
  gap: 10px;
    p {
        font-size: 1rem;
        font-weight: 600;
    }
`;

const Likes: FC<IProps> = ({ likesCount, handleClick, liked}) => {


  return (
    <StyledLikes>
      <Like isLiked={liked} onClick={ handleClick}></Like>
      <p>{likesCount} <b>Likes</b></p>
    </StyledLikes>
  );
};

export default Likes;
