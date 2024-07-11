import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Descuentos from './Descuentos';

const Checkout = () => {
  const location = useLocation();
  const { totalPrecios } = location.state || { totalPrecios: 0 };
  const [mostrarDescuentos, setMostrarDescuentos] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(totalPrecios);
  const [mostrarMetodo, setMostrarMetodo] = useState(true);
  const navigate = useNavigate();

  const ElegirMetodoDePago = () => {
    setMostrarDescuentos(true);
  }
  useEffect(() => {
    if (!mostrarMetodo) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 30000); 

      return () => clearTimeout(timer); 
    }
  }, [mostrarMetodo, navigate]);
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
      {mostrarDescuentos && (<Descuentos ElegirMetodoDePago={ElegirMetodoDePago}/>)}
    </>
  );
}

export default Checkout;