import { Link } from "react-router-dom";
import styled from "styled-components";


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.3rem;
  padding: 30px;
  width:60%;
  min-width:250px; 
  max-width:500px; 
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const FormLink = styled(Link)`
color: wheat;
`
export const StyledTitle = styled.p`
    font-size:2rem;
`
export const StyledMessage = styled.p `
  font-size:1rem;
`
