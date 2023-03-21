import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import checkedsToId from "../utils/checkedsToId";

const initialState = {
    dataFolder: [],
    isSuccess: false,
    isLoading: false,
    message: []
}

export const getFolder = createAsyncThunk("folder/getFolder", async (user, thunkAPI) => {
    try {
        const response = await axios.get(`${process.env.React_App_Link_Api}folder/${user.userId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
});

export const postFolder = createAsyncThunk("folder/postFolder", async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${process.env.React_App_Link_Api}folder`, {
            userId: user.userId,
            nameFolder: user.nameFolder
        })
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const removeFolder = createAsyncThunk("folder/removeFolder", async (user) => {
    let data = checkedsToId(user)
    const response = await axios.post(`${process.env.React_App_Link_Api}folder/delete`, {
        id: data
    })
    return response.data
})

export const restApiFolder = createSlice({
    name: "folder",
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false
        },
        resetMessage: (state) => {
            state.message = []
        }
    },
    extraReducers: {
        // Get Folder
        [getFolder.pending]: (state) => {
            state.isLoading = true
        },
        [getFolder.fulfilled]: (state, action) => {
            state.dataFolder = action.payload;
            state.isLoading = false
        },
        [getFolder.rejected]: (state) => {
            state.isLoading = false
        },

        // Post Folder
        [postFolder.fulfilled]: (state) => {
            state.isSuccess = true
        },

        // Remove Folder
        [removeFolder.fulfilled]: (state, action) => {
            state.isSuccess = true
        }
    }
});

export const { resetSuccess, resetMessage } = restApiFolder.actions
export default restApiFolder.reducer