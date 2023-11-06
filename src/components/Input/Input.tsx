import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ChangeEventHandler, FocusEventHandler, forwardRef } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  autoComplete?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string;
  errorMessage?: string | undefined;
  isTouched?: boolean | undefined;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      placeholder,
      name,
      autoComplete,
      onChange,
      accept,
      disabled,
      className,
      multiple,
      onBlur,
      value,
      isTouched,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          onChange={onChange}
          accept={accept}
          disabled={disabled}
          className={className}
          multiple={multiple}
          onBlur={onBlur}
          value={value}
          ref={ref}
          {...rest}
        />
          <ErrorMessage $isError={errorMessage && isTouched}>
            {errorMessage}
          </ErrorMessage>
      </>
    );
  }
);
