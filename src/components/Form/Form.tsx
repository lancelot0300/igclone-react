import React, { FC, ReactNode } from "react";
import { FormContainer, FormStyled, StyledTitle } from "./Form.style";

interface FormProps {
  children: ReactNode[] | ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  title?: string;
  encType?: string;
}

export const Form: FC<FormProps> = ({ children, onSubmit, title, encType }) => {
  return (
    <FormContainer>
      <FormStyled encType={encType} onSubmit={onSubmit}>
        <StyledTitle>{title}</StyledTitle>
        {children}
      </FormStyled>
    </FormContainer>
  );
};
