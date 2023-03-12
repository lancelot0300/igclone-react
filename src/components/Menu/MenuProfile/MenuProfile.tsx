import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { MenuProfileImage } from "../Menu.styles";
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
        setShowMenu((toggle) => !toggle);
      } 
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <MenuProfileImage ref={imgRef} src={user.avatar} alt="profile" onClick={() => setShowMenu((prev) => !prev)} />

      
      {showMenu &&
        (user.isAuth ? (
          <LoggedDropdown dropdownRef={dropdownRef} onClick={() => setShowMenu((prev) => !prev)} />
        ) : (
          <UnloggedDropdown dropdownRef={dropdownRef} onClick={() => setShowMenu((prev) => !prev)} />
        ))}
    </>
  );
};
