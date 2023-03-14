import React, { FC } from "react";
import styled from "styled-components";

interface IProps {
    isLiked: boolean;
    onClick: () => void;
}

interface IHeart {
    liked: boolean;
}

const Heart = styled.svg<IHeart>`
    fill: ${(props) => (props.liked ? "red" : "black")};
    width: 35px;
    height: 35px;
    cursor: pointer;
    transition: all 0.4s ease-in-out;

    ${(props) =>
        props.liked &&
        `
        animation: like 0.3s ease-in-out;
        @keyframes like {
            0% {
                transform: scale(1);
            }
            25% {
                transform: scale(1);
            }
            75% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
    `}
`;

const Like:FC<IProps> = ({isLiked, onClick}) => {
  return (
    <Heart onClick={onClick} liked={isLiked} viewBox="0 0 32 29.6">
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </Heart>
  );
};

export default Like;
