import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        },
    },
});

export default authSlice.reducer; 
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Path: src\state\features\authSlice.ts
// Compare this snippet from src\state\store.ts:
// import { configureStore } from "@reduxjs/toolkit";
//
