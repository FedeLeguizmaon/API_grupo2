import React, { createContext, useState,useContext } from 'react';

export const CarritoContext = createContext();


export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  
  const agregarAlCarrito = (nombre, imagen, precio) => {
    const id = new Date().getTime()
    setCarrito([...carrito, { id, nombre, imagen, precio }]);
  };

  const Contador = carrito.length;

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
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
