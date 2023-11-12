import { FC} from "react";
import { MenuContainer, MenuLink } from "./Menu.styles";
import { MenuProfile } from "./MenuProfile/MenuProfile";

const Menu: FC = () => {

  return (
    <>
      <MenuContainer>
        <MenuLink to="/">IG clone</MenuLink>
        <MenuProfile />
      </MenuContainer>
    </>
  );
};
export default Menu;
