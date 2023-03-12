import { MenuProfileDropdown, MenuProfileDropdownItem, MenuProfileDropdownStyledLink } from '../../Menu.styles'

interface UnloggedDropdownProps {
    dropdownRef: React.RefObject<HTMLDivElement>;
    onClick: () => void;
}

export const UnloggedDropdown: React.FC<UnloggedDropdownProps> = ({ dropdownRef, onClick }) => {
    return (
        <MenuProfileDropdown ref={dropdownRef}>
            <MenuProfileDropdownStyledLink to="/login">
                <MenuProfileDropdownItem onClick={onClick}>Login</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
            <MenuProfileDropdownStyledLink to="/register">
                <MenuProfileDropdownItem onClick={onClick}>Register</MenuProfileDropdownItem>
            </MenuProfileDropdownStyledLink>
        </MenuProfileDropdown>
    );
};


