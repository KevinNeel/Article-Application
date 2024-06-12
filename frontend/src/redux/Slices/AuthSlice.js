import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

import baseURL from '../../Api/Api'

const initialState = {
    success: null,
    loading: false,
    error: null,
};


// Login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => { // Fix here
        try {

            const response = await axios.post(`${process.env.REACT_APP_AUTH_URL}/login`, { email, password }); // Fix here
            const { user, token } = response.data;
            console.log(user, 'this is auth user');
            localStorage.setItem("access_token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify({
                ...user
            }));
            return { user, token };

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            // login
            .addCase(login.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.error = null;
                state.user = action.payload.user;
            })
            .addCase(login.pending, (state) => {
                state.loading = "pending";
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload ? action.payload.message : "Login failed";
            })

    }
});

export default authSlice.reducer;
