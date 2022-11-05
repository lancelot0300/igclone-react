import { FC } from "react";
import { StyledButton } from "./Button.styles";


interface ButtonProps {
  type: string,
  children: string
  disabled: boolean;
}


export const Button: FC<ButtonProps> = ({children, disabled}) => {
  return <StyledButton disabled={disabled}>{children}</StyledButton>;
};
