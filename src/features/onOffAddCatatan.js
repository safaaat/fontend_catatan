import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hidden: false,
    currentUser: [],
    activeChekbox: false
}

export const onOffAddCatatan = createSlice({
    name: "onOffCatatan",
    initialState,
    reducers: {
        onOffCatatan: (state, action) => {
            state.active = action.payload
        },
        hiddenForm: (state) => {
            state.hidden = !state.hidden
        },
        updateUser: (state, action) => {
            state.currentUser = action.payload
        },
        resetUser: (state) => {
            state.currentUser = []
        },
        updateCheckbox: (state) => {
            state.activeChekbox = !state.activeChekbox
        },
        resetActiveChekbox: (state) => {
            state.activeChekbox = false
        }
    }
});

export const { onOffCatatan, hiddenForm, updateUser, resetUser, updateCheckbox, resetActiveChekbox } = onOffAddCatatan.actions;
export default onOffAddCatatan.reducer;