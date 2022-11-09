import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: rgb(27 43 82);
`;
export const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  background-image: linear-gradient(
    92.88deg,
    #455eb5 9.16%,
    #5643cc 43.89%,
    #673fd7 64.72%
  );
  box-shadow: #5e5df0 0 10px 20px -10px;
  font-family: Inter, Helvetica, "Apple Color Emoji", "Segoe UI Emoji",
    NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji",
    EmojiSymbols, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue",
    "Noto Sans", sans-serif;
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
    margin-bottom: 10px;
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
