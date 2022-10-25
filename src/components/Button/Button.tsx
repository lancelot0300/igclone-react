import { FC } from "react";
import { StyledButton } from "./Button.styles";


interface ButtonProps {
  type: string,
  value: string
}


export const Button: FC<ButtonProps> = ({type, value}) => {
  return <StyledButton type={type} value={value} />;
};
