import React, { createContext, useState,useContext } from 'react';

export const CarritoContext = createContext();


export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  
  const agregarAlCarrito = (Id,nombre, imagen, precio) => {
    const Fecha = new Date().getTime()
    setCarrito([...carrito, { Id, nombre, imagen, precio,Fecha }]);
  };

  const Contador = carrito.length;

  const eliminarDelCarrito = (Fecha) => {
    setCarrito(carrito.filter(item => item.Fecha !== Fecha));
  };

  const finalizarCompra = () => {
    setCarrito([]);
  };
  
  return (
    <CarritoContext.Provider value={{ carrito, Contador,agregarAlCarrito, eliminarDelCarrito, finalizarCompra,productoIds: carrito.map(item => item.Id) } }>
      {children}
    </CarritoContext.Provider>
  );
  
  
};export const useCarrito = () => {
  return useContext(CarritoContext);
};
