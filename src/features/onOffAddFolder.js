import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false
}

export const onOffAddFolder = createSlice({
    name: "on off add folder",
    initialState,
    reducers: {
        updateActive: (state, action) => {
            state.active = action.payload
        }
    }
})

export const { updateActive } = onOffAddFolder.actions;
export default onOffAddFolder.reducer;