import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { MenuProfileContainer, MenuProfileImage } from "../Menu.styles";
import { LoggedDropdown } from "./MenuProfileDropdown/LoggedDropdown";
import { UnloggedDropdown } from "./MenuProfileDropdown/UnloggedDropdown";

interface MenuProfileProps {}

export const MenuProfile: FC<MenuProfileProps> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target === imgRef.current) {
        return;
      } else if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <MenuProfileContainer onClick={() => setShowMenu((prev) => !prev)}>
      <MenuProfileImage ref={imgRef} src={user.avatar} alt="profile" />
      {showMenu &&
        (user.isAuth ? (
          <LoggedDropdown dropdownRef={dropdownRef} />
        ) : (
          <UnloggedDropdown dropdownRef={dropdownRef} />
        ))}
    </MenuProfileContainer>
  );
};
