import { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { AppContainer, Container, GlobalStyle } from "./App.styles";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/config";
import { loginSuccess } from "./state/features/auth/authSlice";
import { useAppDispatch } from "./state/store";

const App: FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() =>{
    const unlisten = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        dispatch(loginSuccess({ email, uid }));
      }
  });
    return () => {
        unlisten();
    }
 }, [dispatch]);
 
  
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

