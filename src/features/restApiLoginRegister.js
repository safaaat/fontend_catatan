import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: {}
}

export const LoginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${process.env.React_App_Link_Api}login`, {
            email: user.email,
            password: user.password
        });
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const RegisterUser = createAsyncThunk("user/registerUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${process.env.React_App_Link_Api}register`, {
            name: user.name,
            email: user.email,
            password: user.password,
            confPassword: user.confPassword
        });
        return response.data.msg
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const refreshToken = createAsyncThunk("user/refreshToken", async () => {
    const response = await axios.get(`${process.env.React_App_Link_Api}token`);

    console.log(response)
})

export const restApiLogin = createSlice({
    name: "loginRegis",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.message = ""
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload
        })

        // Register
        builder.addCase(RegisterUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        });
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        })
    }
})

export const { reset } = restApiLogin.actions;
export default restApiLogin.reducer;


