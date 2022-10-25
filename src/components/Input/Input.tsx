import  { FC } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form/dist/types";
import { StyledInput, StyledLabel } from "./Input.styles";

interface InputProps {
  type: string;
  placeholder: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  name: string;
  register: Function;
}

export const Input: FC<InputProps> = ({
  type,
  placeholder,
  error,
  register,
  name,
}) => {
  return (
    <>
      <StyledInput placeholder={placeholder} type={type} {...register(name)} />
      {error && <StyledLabel>{error.toString()}</StyledLabel>}
    </>
  );
};
