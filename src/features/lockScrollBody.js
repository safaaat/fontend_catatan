import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLockScroll: false
}

const lockScrollBody = createSlice({
    name: "lock Scroll body",
    initialState,
    reducers: {
        toggleScrollLock: (state, action) => {
            state.isLockScroll = action.payload
        }
    }
});


export const { toggleScrollLock } = lockScrollBody.actions
export default lockScrollBody.reducer