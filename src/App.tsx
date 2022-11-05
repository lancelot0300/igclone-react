import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { reset } from "styled-reset";
import styled, { createGlobalStyle } from "styled-components";
import Menu from "./components/Menu/Menu";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";

const GlobalStyle = createGlobalStyle`

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

const AppContainer = styled.div`
  min-width: 240px;
  width:100vw;
`;

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  min-height: 90vh;
`;


const App: FC = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Menu />
      <Container>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      </Container>
    </AppContainer>
  );
};

export default App;
