import React, { createContext, useState,useContext } from 'react';

export const CarritoContext = createContext();


export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  
  const agregarAlCarrito = (producto, precio) => {
    setCarrito([...carrito, { producto, precio }]);
  };

  const Contador = carrito.length;

  const eliminarDelCarrito = (productoAEliminar, precio) => {
    const index = carrito.findIndex(item => item.producto === productoAEliminar && item.precio === precio);
    if (index !== -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito.splice(index, 1);
      setCarrito(nuevoCarrito);
    }
  };

  const finalizarCompra = () => {
    setCarrito([]);
  };
  
  return (
    <CarritoContext.Provider value={{ carrito, Contador,agregarAlCarrito, eliminarDelCarrito, finalizarCompra }}>
      {children}
    </CarritoContext.Provider>
  );
  
  
};export const useCarrito = () => {
  return useContext(CarritoContext);
};
