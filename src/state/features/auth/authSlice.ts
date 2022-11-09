import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/interfaces";
import {signOut} from "firebase/auth";
import { auth } from "../../../config/config";


interface IInitialState {
  user: IUser;
}



const initialState: IInitialState = {
  user: {
    isAuth: false,
    uid: "",
    email: null,
  },
};

 const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    
    },
    loginFailure: (state) => {
      state.user = initialState.user;
    },
    logout: (state) => {
      state.user = initialState.user;
      signOut(auth);
    },
  },
});



export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout } = authSlice.actions;

