import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Mail: "",
    Contraseña: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { Mail, Contraseña } = action.payload;
            state.Mail = Mail;
            state.Contraseña = Contraseña;
        },
        changeMail: (state, action) => {
            state.Mail = action.payload;
        },
    },
});

export const { addUser, changeMail } = userSlice.actions;
export default userSlice.reducer;
