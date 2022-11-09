import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/features/auth/authSlice";
import { RootState } from "../../state/store";
import { Button } from "../Button/Button";
import { MenuContainer, MenuLink } from "./MenuContainer.styles";

const Menu: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <MenuContainer>
        <MenuLink to="/">Home</MenuLink>
        {user.isAuth ? (
          <Button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Log out
          </Button>
        ) : (
          <MenuLink to="/login">Login</MenuLink>
        )}
      </MenuContainer>
    </>
  );
};
export default Menu;
