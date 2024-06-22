import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CarritoContext } from './CarritoContext';
import Checkout from './Checkout';
import { useNavigate } from 'react-router-dom';
const Carrito = () => {
  const { carrito, eliminarDelCarrito, finalizarCompra } = useContext(CarritoContext);
  const [totalPrecios, setTotalPrecios] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const[finalizar,setFinalizar]= useState(false);
  const navigate = useNavigate();
  const handleFinalizarCompra = () => {
    setFinalizar(true);
        let totalPreciosTemp = carrito.reduce((total, item) => total + item.precio, 0);
        setTotalPrecios(totalPreciosTemp);
        
        navigate('/checkout', { state: { carrito, totalPrecios: totalPreciosTemp } });
        finalizarCompra()
      };
  

  const saveCarrito = async () => {
    try {
      const response = await axios.post('http://localhost:3001/compras', {
        Elementos: carrito
      });
      return response;
    } catch (error) {
      console.error('Error al cargar la compra:', error);
    }
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      <ul>
        {!finalizar && carrito && carrito.length > 0 ? (
          carrito.map((item, index) => (
            <li key={index}>
              {item.producto} - {item.precio}
              <button onClick={() => eliminarDelCarrito(item.producto, item.precio)}>Eliminar</button>
              <button onClick={handleFinalizarCompra}>Finalizar compra</button>
            </li>
          ))
        ) : (
          <li>No hay elementos en el carrito</li>
        )}
      </ul>
      
    </div>
  );
};

export default Carrito;