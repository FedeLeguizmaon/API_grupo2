import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    errorMessage: "",
    successMessage: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUserSuccess: (state, action) => {
            state.users.push(action.payload);
            state.successMessage = "User registered successfully!";
            state.errorMessage = "";
        },
        addUserFailure: (state, action) => {
            state.errorMessage = action.payload;
            state.successMessage = "";
        },
    },
});



export const registerUser = ({ email, password, firstname, lastname, role }) => (dispatch) => {
    fetch("http://localhost:4002/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstname, lastname, role }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                dispatch(addUserFailure(data.message));
            } else {
                const user = {
                    Id: data.id,
                    Mail: email,
                    Contraseña: password,
                    Nombre: firstname,
                    Apellido: lastname,
                    Rol: role,
                    Token: data.access_token,
                };
                dispatch(addUserSuccess(user));
            }
        })
        .catch((error) => {
            dispatch(addUserFailure("An error occurred during registration."));
        });
},




        changeMail: (state, action) => {
            state.Mail = action.payload;
        },
        changeContra: (state, action) => {
            state.Contraseña = action.payload;
        },
        logoutUser: (state) => {
            return initialState;
        },
        loginUser: (state, action) => {
            const { Id, Mail, Contraseña, Token, Rol} = action.payload;
            state.Id = Id;
            state.Mail = Mail;
            state.Contraseña = Contraseña;
            state.Token = Token;
            state.Rol = Rol;
        }
    
    },
});

export const { addUser, changeMail,logoutUser,loginUser,changeContra,addUserSuccess, addUserFailure} = userSlice.actions;
export default userSlice.reducer;
