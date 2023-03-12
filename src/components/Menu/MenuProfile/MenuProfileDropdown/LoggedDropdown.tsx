import React from "react";
import { useSelector } from "react-redux";
import { logout } from "../../../../state/features/auth/authSlice";
import { RootState, useAppDispatch } from "../../../../state/store";
import {
  MenuProfileDropdown,
  MenuProfileDropdownItem,
  MenuProfileDropdownStyledLink,
} from "../../Menu.styles";

interface LoggedDropdownProps {
    dropdownRef: React.RefObject<HTMLDivElement>;
    onClick: () => void;
}

export const LoggedDropdown: React.FC<LoggedDropdownProps> = ({ dropdownRef, onClick }) => {

    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleLogoutClick = () => {
        dispatch(logout());
    };

    return (
        <MenuProfileDropdown ref={dropdownRef}>
            <MenuProfileDropdownStyledLink to="/">
                <MenuProfileDropdownItem onClick={onClick}>Home</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
            <MenuProfileDropdownStyledLink to={`/create-post`}>
                <MenuProfileDropdownItem onClick={onClick}>Create Post</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
            <MenuProfileDropdownStyledLink to={`/profile/${user.uid}`}>
                <MenuProfileDropdownItem onClick={onClick}>Profile</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
            <MenuProfileDropdownStyledLink to="/settings">
                <MenuProfileDropdownItem onClick={onClick}>Settings</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
            <MenuProfileDropdownStyledLink to="/login">
                <MenuProfileDropdownItem onClick={handleLogoutClick}>Logout</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
        </MenuProfileDropdown>
    );
};