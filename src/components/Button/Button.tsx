import { type } from "os";
import { FC } from "react";
import { StyledButton } from "./Button.styles";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  type,
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};
