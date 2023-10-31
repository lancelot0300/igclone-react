import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AppContainer, Container, GlobalStyle } from "./App.styles";
import {
  initialState,
  loginFailure,
  loginSuccess,
} from "./state/features/auth/authSlice";
import { RootState, useAppDispatch } from "./state/store";
import { useSelector } from "react-redux";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { Home } from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";
import CreatePost from "./Pages/CreatePost/CreatePost";
import { PageNotFound } from "./Pages/PageNotFound/PageNotFound";

const App: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <AppContainer>
        <GlobalStyle />

        {loading ? (
          <Container>Loading...</Container>
        ) : (
          <>
            <Menu />
            <Container>
              <Routes>
                <Route
                  path="/login"
                  element={ 
                    <ProtectedRoute isAllowed={!user} redirectPath="/">
                      <Login />
                    </ProtectedRoute>
                  }
                ></Route>
               <Route
                  path="/register"
                  element={
                    <ProtectedRoute isAllowed={!user} redirectPath="/">
                      <Register />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      isAllowed={user ? true : false}
                      redirectPath="/login"
                    >
                      <Home />
                   </ProtectedRoute> 
                  }
                ></Route>
                <Route
                  path="/profile/:id"
                  element={
                    <ProtectedRoute
                      isAllowed={user ? true : false}
                      redirectPath="/login"
                    >
                      <Profile></Profile>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute
                      isAllowed={user ? true : false}
                      redirectPath="/login"
                    >
                      <Settings></Settings>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/create-post"
                  element={
                    <ProtectedRoute
                      isAllowed={user ? true : false}
                      redirectPath="/login"
                    >
                      <CreatePost/>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route path="*" element={<PageNotFound/>} />
              </Routes>
            </Container>
          </>
        )}
      </AppContainer>
    </>
  );
};

export default App;
