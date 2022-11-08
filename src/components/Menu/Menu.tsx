import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/features/auth/authSlice";
import { RootState } from "../../state/store";
import { MenuContainer, MenuLink } from "./MenuContainer.styles";



const Menu: FC = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return (
    <MenuContainer>
      <MenuLink to="/">Home</MenuLink>
      {
        user ? <button onClick={ () => {dispatch(logout())} }>Log out</button> : <MenuLink to="/login">Login</MenuLink>
      }
      
    </MenuContainer>
  );
};
export default Menu;
