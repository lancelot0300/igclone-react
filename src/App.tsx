import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AppContainer, Container, GlobalStyle } from "./App.styles";
import { auth } from "./config/config";
import {
  initialState,
  loginFailure,
  loginSuccess,
} from "./state/features/auth/authSlice";
import { RootState, useAppDispatch } from "./state/store";
import { useSelector } from "react-redux";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, uid, photoURL } = user;
        dispatch(
          loginSuccess({
            isAuth: true,
            email,
            uid,
            avatar: photoURL || initialState.user.avatar,
          })
        );
        setLoading(false);
      } else {
        dispatch(loginFailure());
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      <AppContainer>
        <GlobalStyle />
        <Menu />
        {loading ? (
          <Container>Loading...</Container>
        ) : (
          <Container>
            <Routes>
              <Route
                path="/login"
                element={
                  <ProtectedRoute isAllowed={!user.isAuth} redirectPath="/">
                    <Login />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/"
                element={
                  <ProtectedRoute isAllowed={user.isAuth} redirectPath="/login">
                    <Home />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </Container>
        )}
      </AppContainer>
    </>
  );
};

export default App;
