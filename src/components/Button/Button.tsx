import { FC } from "react";
import { StyledButton } from "./Button.styles";


interface ButtonProps {
  type?: string,
  children: string
  disabled?: boolean;
  onClick?: () => void;
}


export const Button: FC<ButtonProps> = ({children, disabled, onClick}) => {
  return <StyledButton onClick={onClick} disabled={disabled}>{children}</StyledButton>;
};
