import React, { useState,useEffect,useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Descuentos from './Descuentos';
import { CarritoContext } from './CarritoContext';
const Checkout = () => {
  const location = useLocation();
  const [mostrarDescuentos, setMostrarDescuentos] = useState(false);
  const { carrito, productoIds, finalizarCompra,precioTotal} = useContext(CarritoContext);
  const [precioTotales, setPrecioTotal] = useState(precioTotal);
  const [mostrarMetodo, setMostrarMetodo] = useState(true);
  const navigate = useNavigate();

  const ElegirMetodoDePago = (precio) => {
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
      <h2>Precio de la compra: {precioTotales} pesos</h2>
      {mostrarMetodo && !mostrarDescuentos && (
        <button onClick={ElegirMetodoDePago}>Elegir Método De Pago</button>
      )}
      {mostrarDescuentos && (<Descuentos setMostrarDescuentos={setMostrarDescuentos} setMostrarMetodo={setMostrarMetodo} setPrecioTotal={setPrecioTotal}/>)}
    </>
  );
}

export default Checkout;