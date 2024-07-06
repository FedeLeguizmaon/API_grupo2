import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Mail: "",
    Contraseña: "",
    Nombre:"",
    Apellido:"",
    Rol:"",
    Token:"",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { Mail, Contraseña, Nombre, Apellido, Rol,Token } = action.payload;
            state.Mail = Mail;
            state.Contraseña = Contraseña;
            state.Nombre = Nombre;
            state.Apellido = Apellido;
            state.Rol = Rol;
            state.Token = Token;
        },
        changeMail: (state, action) => {
            state.Mail = action.payload;
        },
        logoutUser: (state) => {
            return initialState;
        },
        loginUser: (state, action) => {
            const { Mail, Contraseña, Token } = action.payload;
            state.Mail = Mail;
            state.Contraseña = Contraseña;
            state.Token = Token;
        }
    
    },
});

export const { addUser, changeMail,logoutUser,loginUser} = userSlice.actions;
export default userSlice.reducer;
