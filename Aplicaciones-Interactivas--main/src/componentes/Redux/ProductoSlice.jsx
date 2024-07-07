import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Id: "",
    Nombre:"",
    Descripcion: "",
    Stock:"",
    Precio:"",
    Imagen:"",
    Talle:""
};

export const produductoSlice = createSlice({
    name: "producto",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const {Id, Nombre, Descripcion, Stock, Precio, Imagen, Talle} = action.payload;
            state.Id = Id;
            state.Nombre = Nombre;
            state.Descripcion = Descripcion;
            state.Stock = Stock;
            state.Precio = Precio;
            state.Imagen = Imagen;
            state.Talle = Talle;
        },
        changeProduct: (state, action) => {
            const {Nombre, Descripcion, Stock, Precio, Imagen, Talle} = action.payload;
            state.Nombre = Nombre;
            state.Descripcion = Descripcion;
            state.Stock = Stock;
            state.Precio = Precio;
            state.Imagen = Imagen;
            state.Talle = Talle;
        },
        deleteProduct: (state) => {
            state.Id = "";
            state.Nombre = "";
            state.Descripcion = "";
            state.Stock = "";
            state.Precio = "";
            state.Imagen = "";
            state.Talle = "";
        }
    }
});
export const {addProduct, changeProduct, deleteProduct} = produductoSlice.actions;
export default produductoSlice.reducer;