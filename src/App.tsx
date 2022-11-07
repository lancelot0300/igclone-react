import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { AppContainer, Container, GlobalStyle } from "./App.styles";

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
