import { ChangeEventHandler, FocusEventHandler, forwardRef,} from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  name: string;
  autocomplete?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps> ((
  {
    type,
    placeholder,
    name,
    autocomplete,
    onChange,
    accept,
    disabled,
    className,
    multiple,
    onBlur,
    value,
    ...rest
  }, ref
) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete={autocomplete}
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
  );
});


  
