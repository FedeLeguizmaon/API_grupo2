import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CarritoContext } from './CarritoContext';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, finalizarCompra } = useContext(CarritoContext);
  const [totalPrecios, setTotalPrecios] = useState(0);
  const[finalizar,setFinalizar]= useState(false);
  const navigate = useNavigate();
  
  const handleFinalizarCompra = () => {
    setFinalizar(true);
        let totalPreciosTemp = carrito.reduce((total, item) => total + item.precio, 0);
        setTotalPrecios(totalPreciosTemp);
        
        navigate('/checkout', { state: { carrito, totalPrecios: totalPreciosTemp } });
        finalizarCompra()
      };
  
      const handlerDescubrir = () =>{
        navigate('/Catalogo')

      }
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
      <h1 className='titulo'>Carrito de compras</h1>
      
        {!finalizar && carrito && carrito.length > 0 ? (
           <div>
           <ul>
             {carrito.map((item, index) => (
               <li key={index}>
                 {item.producto} - {item.precio}
                 <button onClick={() => eliminarDelCarrito(item.producto, item.precio)}>Eliminar</button>
               </li>
             ))}
           </ul>
           <button onClick={handlerDescubrir}>Seguir Comprando</button>
           <button onClick={handleFinalizarCompra}>Finalizar compra</button>
           
         </div>
          ) 
           
        : (
         <div>
         <div>
         <h1>¡Todavia no has añadido elementos a tu carrito! </h1>
         <button className="catalogoCarrito" onClick={handlerDescubrir}>Descubrir productos</button>
         
       </div></div> 
          
        )}
      
      
    </div>
  );
};

export default Carrito;