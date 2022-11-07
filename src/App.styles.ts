import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`

  ${reset}

  *{
    box-sizing:border-box;
  }
  body {
    color:white;
    background-color: rgb(15 23 42);
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export const AppContainer = styled.div`
  min-width: 240px;
`;

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;