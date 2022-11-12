import styled from "styled-components";
import { Link } from "react-router-dom";

export const MenuContainer = styled.nav`
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
export const MenuProfileContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 40px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`;
export const MenuProfileImage = styled.img`
  width: 40px;
`;
export const MenuProfileName = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
    margin-left: 10px;
    font-size: 1.2rem;
    color: #fff;
  }
`;
export const MenuProfileDropdown = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  width: 200px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px -10px #5e5df0;
  z-index: 100;

  &:after {
    position: absolute;
    top: -5px;
    right: 10px;
    rotate: 45deg;
    content: "";
    display: block;
    color: blue;
    width: 20px;
    height: 20px;
    background-color: #fff;
  }
`;
export const MenuProfileDropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #000;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const MenuProfileDropdownStyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
  &:hover {
    color: #000;
  }
`




