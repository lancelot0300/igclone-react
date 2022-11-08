import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSliceReducer from "./features/auth/authSlice";

const store = configureStore ({
    reducer: {
        auth: authSliceReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store