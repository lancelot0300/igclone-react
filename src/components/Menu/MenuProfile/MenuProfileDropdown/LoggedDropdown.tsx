import React from "react";
import { logout } from "../../../../state/features/auth/authSlice";
import { useAppDispatch } from "../../../../state/store";
import {
  MenuProfileDropdown,
  MenuProfileDropdownItem,
  MenuProfileDropdownStyledLink,
} from "../../Menu.styles";

interface LoggedDropdownProps {
    dropdownRef: React.RefObject<HTMLDivElement>;
}

export const LoggedDropdown: React.FC<LoggedDropdownProps> = ({ dropdownRef }) => {

    const dispatch = useAppDispatch();

    
    return (
        <MenuProfileDropdown ref={dropdownRef}>
            <MenuProfileDropdownStyledLink to="/profile">
                <MenuProfileDropdownItem>Profile</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
            <MenuProfileDropdownStyledLink to="/settings">
                <MenuProfileDropdownItem>Settings</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
            <MenuProfileDropdownStyledLink to="/login">
                <MenuProfileDropdownItem onClick={() => dispatch(logout())}>Logout</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
        </MenuProfileDropdown>
    );
};