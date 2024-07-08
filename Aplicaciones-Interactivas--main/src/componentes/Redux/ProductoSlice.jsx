import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productos: [], 
    productoSeleccionado: {
      Id: "",
      Nombre: "",
      Descripcion: "",
      Stock: "",
      Precio: "",
      Imagen: "",
      Talle: ""
    }
  };

export const productoSlice = createSlice({
    name: "producto",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.productos.push(action.payload);
          },
          selectProduct: (state, action) => {
            state.productoSeleccionado = action.payload;
          },
        changeProduct: (state, action) => {
            const { Id } = action.payload;
            const existingProduct = state.productos.find((prod) => prod.Id === Id);
            if (existingProduct) {
              Object.assign(existingProduct, action.payload);
            }
          },
          deleteProduct: (state) => {
            state.productos = state.productos.filter((prod) => prod.Id !== state.productoSeleccionado.Id);
            state.productoSeleccionado = {
              Id: "",
              Nombre: "",
              Descripcion: "",
              Stock: "",
              Precio: "",
              Imagen: "",
              Talle: ""
            };
          }
        }
      });

export const {addProduct, changeProduct, deleteProduct,selectProduct} = productoSlice.actions;
export default productoSlice.reducer;