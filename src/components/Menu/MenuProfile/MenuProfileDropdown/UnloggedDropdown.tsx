import { MenuProfileDropdown, MenuProfileDropdownItem, MenuProfileDropdownStyledLink } from '../../Menu.styles'

interface UnloggedDropdownProps {
    dropdownRef: React.RefObject<HTMLDivElement>;
}

export const UnloggedDropdown: React.FC<UnloggedDropdownProps> = ({ dropdownRef }) => {
    return (
        <MenuProfileDropdown ref={dropdownRef}>
            <MenuProfileDropdownStyledLink to="/login">
                <MenuProfileDropdownItem>Login</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
            <MenuProfileDropdownStyledLink to="/register">
                <MenuProfileDropdownItem>Register</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
        </MenuProfileDropdown>
    );
};


