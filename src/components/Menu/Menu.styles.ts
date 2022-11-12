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
  font-size: 20px;
  font-weight: 700;
  margin-right: 20px;
  &:hover {
    color: #f5f5f5;
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




