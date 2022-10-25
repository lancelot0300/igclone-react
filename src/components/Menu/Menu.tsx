import { FC } from "react";
import { MenuContainer, MenuLink } from "./MenuContainer.styles";

const Menu: FC = () => {
  return (
    <MenuContainer>
      <MenuLink to="/login">Login</MenuLink>
      <MenuLink to="/register">Register</MenuLink>
    </MenuContainer>
  );
};
export default Menu;
