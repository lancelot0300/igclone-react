import { FC } from "react";
import styled from "styled-components";
import Like from "../Like/Like";
import { ILike } from "../../interfaces/interfaces";

interface IProps {
  likes: ILike[] | undefined;
  handleClick: () => void;
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

const Likes: FC<IProps> = ({ handleClick}) => {
  const likesCount = 0;
  const liked = false;



  return (
    <StyledLikes>
      <Like isLiked={liked} onClick={handleClick}></Like>
      <p>{likesCount} <b>Likes</b></p>
    </StyledLikes>
  );
};

export default Likes;
