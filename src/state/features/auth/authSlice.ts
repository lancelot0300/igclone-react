import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/interfaces";



interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
      console.log(sessionStorage.clear());
    },
  },
});

export default authSlice.reducer;
export const { loginSuccess, logout } = authSlice.actions;

