import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Descuentos from './Descuentos';
import { useCarrito } from './CarritoContext';

const Checkout = () => {
  const { carrito, vaciarCarrito } = useCarrito();
  const location = useLocation();
  const { totalPrecios } = location.state || { totalPrecios: 0 };
  const [mostrarDescuentos, setMostrarDescuentos] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(totalPrecios);
  const [mostrarMetodo, setMostrarMetodo] = useState(true);
  const navigate = useNavigate();

  const actualizarPrecio = (nuevoPrecio) => {
    setPrecioTotal(nuevoPrecio);
  }

  const ElegirMetodoDePago = () => {
    setMostrarDescuentos(true);
  }

  

  return (
    <>
      {!mostrarMetodo && (
        <>
          <h1>Compra exitosa</h1>
          <button onClick={() => navigate('/')}>Regresar al inicio</button>
        </>
      )}
      <h2>Precio de la compra: {precioTotal}</h2>
      {mostrarMetodo && !mostrarDescuentos && (
        <button onClick={ElegirMetodoDePago}>Elegir Método De Pago</button>
      )}
      {mostrarDescuentos && (
        <Descuentos
          actualizarPrecio={actualizarPrecio}
          totalPrecios={precioTotal}
          setMostrarDescuentos={setMostrarDescuentos}
          mostrarDescuentos={mostrarDescuentos}
          setMostrarMetodo={setMostrarMetodo}
          mostrarMetodo={mostrarMetodo}
        />
      )}
      
    </>
  );
}

export default Checkout;