import { createSlice } from "@reduxjs/toolkit";

const formRegisLogin = createSlice({
    name: "password invisible or visible",
    initialState: {
        booleanPas: false,
        booleanConf: false,
        regisSign: "sign in"
    },
    reducers: {
        updatePas: (state, action) => {
            state.booleanPas = action.payload;
        },
        updateConf: (state, action) => {
            state.booleanConf = action.payload;
        },
        updateRegisSign: (state, action) => {
            state.regisSign = action.payload
        }
    }
});

export const { updatePas, updateConf, updateRegisSign } = formRegisLogin.actions;
export default formRegisLogin.reducer;