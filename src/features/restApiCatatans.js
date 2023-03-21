import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    catatans: [],
    checkeds: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: {}
}

export const getCatatan = createAsyncThunk("catatan/getCatatan", async (user) => {
    const response = await axios.get(`${process.env.React_App_Link_Api}catatan/${user.userId}`);
    return response.data
});

export const postCatatan = createAsyncThunk("catatan/postCatatan", async (user) => {
    const response = await axios.post(`${process.env.React_App_Link_Api}catatan`, {
        userId: user.userId,
        judul: user.judul,
        contain: user.contain,
        folderId: user.folderId,
        createdDate: user.createdDate,
        updateDate: user.updateDate
    });
    return response.data
});

export const updateCatatan = createAsyncThunk("catatan/updateCatatan", async (user) => {
    const response = await axios.patch(`${process.env.React_App_Link_Api}catatan/${user.id}`, {
        judul: user.judul,
        contain: user.contain,
        updateDate: user.updateDate
    })
    return response.data
})

export const deleteCatatan = createAsyncThunk("catatan/deleteCatatan", async (user) => {
    const response = await axios.post(`${process.env.React_App_Link_Api}catatan/delete`, {
        id: user
    });
    return response.data
})

export const restApiCatatan = createSlice({
    name: "catatan",
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.isSuccess = false
        },
        resetMessage: (state) => {
            state.message = false
        },
        handleCekbox: (state, action) => {
            // Menampung data dari State
            let data = state.checkeds
            // Menampung data dari Input yang di kirim
            let input = action.payload

            // Select All
            if (input.selectAll === true) {
                // Jika semua Cekbox active, kosongkan cekbox
                if (input.data.length === data.length) {
                    state.checkeds = []
                } else {
                    // jika tidak active semua, celis cekbox semua
                    state.checkeds = input.data
                }
            } else {
                // cek apakah data di state sama dengan data yang di input
                const filterByid = data.filter((data) => {
                    return data.id === input.id
                })
                // Masukin data yang ada di dlm state
                let newChecked = [...state.checkeds];
                // Jika data tidak ada di state push data input ke newCecked
                if (filterByid.length === 0) {
                    newChecked.push(action.payload);
                } else {
                    // jika ada hilangkan data di dlm state
                    newChecked = newChecked.filter((data) => {
                        return data.id !== input.id
                    })
                }
                // Masukan data ke dalam state
                state.checkeds = newChecked
            }

        },
        resetCheckeds: (state) => {
            state.checkeds = []
        }
    },
    extraReducers: {
        [getCatatan.pending]: (state) => {
            state.isLoading = true
        },
        [getCatatan.fulfilled]: (state, action) => {
            state.catatans = action.payload;
            state.isLoading = false
        },
        [getCatatan.rejected]: (state) => {
            state.isLoading = false
        },

        [postCatatan.pending]: (state) => {
            state.isLoading = true
        },
        [postCatatan.fulfilled]: (state) => {
            state.isLoading = false
            state.isSuccess = true
        },
        [getCatatan.rejected]: (state) => {
            state.isLoading = false
        },

        [updateCatatan.pending]: (state) => {
            state.isLoading = true
        },
        [updateCatatan.fulfilled]: (state) => {
            state.isLoading = false
            state.isSuccess = true
        },
        [updateCatatan.rejected]: (state) => {
            state.isLoading = false
        },

        [deleteCatatan.fulfilled]: (state) => {
            state.isSuccess = true
        }
    }
})

export const { resetSuccess, handleCekbox, resetMessage, resetCheckeds } = restApiCatatan.actions
export default restApiCatatan.reducer