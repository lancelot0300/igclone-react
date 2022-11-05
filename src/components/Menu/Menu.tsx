import { FC } from "react";
import { MenuContainer, MenuLink } from "./MenuContainer.styles";

const Menu: FC = () => {
  return (
    <MenuContainer>
      <MenuLink to="/">Home</MenuLink>
      <MenuLink to="/login">Login</MenuLink>
    </MenuContainer>
  );
};
export default Menu;
