import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        confirmationResult: null, 
    },
    reducers: {
        loginUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        setConfirmationResult: (state, action) => {
            state.confirmationResult = action.payload;
        }
    },
})

export const { loginUser, logoutUser, setConfirmationResult } = authSlice.actions;

export default authSlice.reducer;
