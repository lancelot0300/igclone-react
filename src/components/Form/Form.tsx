import React, { FC, ReactNode } from "react";
import { FormContainer, FormStyled, StyledTitle } from "./Form.style";

interface FormProps {
  children: ReactNode[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
}

export const Form: FC<FormProps> = ({ children, onSubmit, title }) => {
  return (
    <FormContainer>
      <FormStyled onSubmit={onSubmit}>
        <StyledTitle>{title}</StyledTitle>
        {children}
      </FormStyled>
    </FormContainer>
  );
};
