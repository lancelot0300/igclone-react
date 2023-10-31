import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/interfaces";


interface IInitialState {
  user: IUser;
}


const userFromLocalStorage = localStorage.getItem("user");
export const initialState: IInitialState = {
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
};

 const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state) => {
      state.user = initialState.user;
    },
    logout: (state) => {
      state.user = initialState.user;
      localStorage.removeItem("user");
    },
  },
});



export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout } = authSlice.actions;

