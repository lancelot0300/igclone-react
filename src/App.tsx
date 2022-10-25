import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Menu from "./components/Menu/Menu";
import { Login } from "./components/Pages/Login/Login";
import { Register } from "./components/Pages/Register/Register";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing:border-box;
  }
  body {
    background-color: rgb(15 23 42);
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

const AppContainer = styled.div`
  min-width: 250px;
`;


const App: FC = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Menu />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </AppContainer>
  );
};

export default App;
