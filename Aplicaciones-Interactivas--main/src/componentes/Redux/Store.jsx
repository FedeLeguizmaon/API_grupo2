import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./UserSlice";
import productoReducer from "./ProductoSlice";
export const store = configureStore({
    reducer:{
        user : userReducer,
        producto : productoReducer,

    },
})