import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuContainer = styled.div`
  width: 100%;
  height: 70px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: rgb(27 43 82);
  gap: 20px;
  padding-right: 20px;
`;
export const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
  box-shadow: #5E5DF0 0 10px 20px -10px;
  font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  outline: 0 solid transparent;
  padding: 8px 18px;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    color: wheat;
    border-color: wheat;
    margin-bottom:10px;
  }

  @media (min-width: 640px) {
    font-size: 1.1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.3rem;
  }

  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }
`;
