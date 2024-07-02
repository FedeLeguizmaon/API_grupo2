import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Mail: "",
    Contraseña: "",
    Nombre:"",
    Apellido:"",
    Rol:"",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { Mail, Contraseña, Nombre, Apellido, Rol } = action.payload;
            state.Mail = Mail;
            state.Contraseña = Contraseña;
            state.Nombre = Nombre;
            state.Apellido = Apellido;
            state.Rol = Rol;
        },
        changeMail: (state, action) => {
            state.Mail = action.payload;
        },
    },
});

export const { addUser, changeMail } = userSlice.actions;
export default userSlice.reducer;
