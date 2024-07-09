import React, { useContext, useState } from 'react';
import axios from 'axios';
import './estilos/CarritoStyles.css';
import { CarritoContext } from './CarritoContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
                <br />
                {item.nombre} - {item.precio}
                <FontAwesomeIcon
                  className="basura"
                  icon={faTrash}
                  onClick={() => eliminarDelCarrito(item.id)}
                />
               </li>
             ))}
           </ul>
           <button onClick={handlerDescubrir} className="button button-descubrir">Seguir Comprando</button>
           <button onClick={handleFinalizarCompra} className="button button-finalizar"> Finalizar compra</button>
           <button onClick={() => { finalizarCompra() }} className="button button-vaciar">Vaciar carrito</button>
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