import React, { createContext, useState,useContext,useEffect} from 'react';

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

  const calcularPrecioTotal = () => {
    return carrito.reduce((total, item) => total + item.precio, 0);
  };
  const finalizarCompra = () => {
    setCarrito([]);
  };
  // Calcula el precio total cada vez que el carrito cambia
  useEffect(() => {
    // Puedes hacer algo con el precio total aquí si es necesario
    const precioTotal = calcularPrecioTotal();
    console.log('Precio total del carrito:', precioTotal);
  }, [carrito]);
  return (
    <CarritoContext.Provider value={{ carrito, Contador,agregarAlCarrito, eliminarDelCarrito, finalizarCompra,productoIds: carrito.map(item => parseInt(item.Id)), precioTotal: calcularPrecioTotal(), } }>
      {children}
    </CarritoContext.Provider>
  );
  
  
};export const useCarrito = () => {
  return useContext(CarritoContext);
};
