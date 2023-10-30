import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/interfaces";
import { auth } from "../../../config/config";


interface IInitialState {
  user: IUser;
}



export const initialState: IInitialState = {
  user: {
    isAuth: false,
    uid: "",
    email: null,
    photoURL: "https://i0.wp.com/www.mnleadership.org/wp-content/uploads/2017/02/Anonymous-Avatar.png?ssl=1",
    displayName: null,
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
    avatarChange: (state, action: PayloadAction<string>) => {
      state.user.photoURL = action.payload;
    },
  },
});



export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout, avatarChange } = authSlice.actions;

