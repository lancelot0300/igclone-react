import  { FC, forwardRef } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form/dist/types";
import { StyledInput, StyledLabel } from "./Input.styles";

interface InputProps {
  type: string;
  placeholder?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  name: string;
  register?: Function;
  autocomplete?: string;
  onChange?: Function;
  accept?: string;
  disabled?: boolean;
  ref? : any;
}

export const Input: FC<InputProps> = forwardRef(({
  type,
  placeholder,
  error,
  register,
  name,
  autocomplete,
  onChange,
  accept,
  disabled,
}, ref) => {
  return (
    <>
      <StyledInput disabled={disabled} placeholder={placeholder} autoComplete={autocomplete} type={type} ref={ref} onChange={onChange} accept={accept} { ...register && {...register(name)}} />
      {error && <StyledLabel>{error.toString()}</StyledLabel>}
    </>
  );
});



