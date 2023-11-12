import styled from "styled-components";
import { Link } from "react-router-dom";
import  Image  from "../PostImage/PostImage"
export const MenuContainer = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: rgb(27 43 82);
  z-index: 100;
`;
export const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  margin-right: 20px;
  &:hover {
    color: #f5f5f5;
  }

`;
export const MenuProfileImage = styled(Image)`
  border: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
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
  top: 75px;
  right: 25px;
  width: 200px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px -10px #5e5df0;

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




