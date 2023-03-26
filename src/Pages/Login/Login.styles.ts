import styled from "styled-components";
import { boolean } from "yup";


export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 90vh;
  min-height: 320px;
  width:100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.3rem;
  padding: 30px;
  width:100%;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width:100%;
`;