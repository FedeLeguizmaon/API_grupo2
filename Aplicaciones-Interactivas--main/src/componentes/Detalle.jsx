import React, { useContext, useState } from "react";
import './estilos/DetalleStyles.css';
import { CarritoContext } from './CarritoContext';
import { useLocation, useNavigate } from "react-router-dom";

const Detalle = () => {
  const location = useLocation();
  const producto = location.state.producto;
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeOculto, setMensajeOculto] = useState(false);
 
  const handleAgregarAlCarrito = (nombre, precio) => {
    agregarAlCarrito(nombre, precio);
    setMensajeVisible(true);
    setMensajeOculto(false);
    setTimeout(() => {
      setMensajeOculto(true);
    }, 1000); // El mensaje se empieza a desvanecer después de 1 segundos
    setTimeout(() => {
      setMensajeVisible(false);
    }, 2000); // El mensaje desaparece después de 2 segundos
  };

  return (
    <div className='detail'>
      <button className="close-button" onClick={() => navigate('/Catalogo')}>X</button>
      <div>
        <img className="image" src={producto.Imagen} alt={producto.Name} />
      </div>
      <div className="info" key={producto.id}>
        <h3 style={{ fontSize: 30 }}>{producto.Name}</h3>
        <p style={{ fontSize: 25 }}>{producto.Descripcion}</p>
        <p style={{ fontSize: 25 }}>Stock: {producto.Stock}</p>
        <p style={{ fontSize: 30 }}>Precio: ${producto.Precio}</p>
        <button className="add-to-cart" onClick={() => handleAgregarAlCarrito(producto.Name, parseInt(producto.Precio))}>Agregar al Carrito</button>
        <button className="BotonAtras" onClick={() => navigate('/Catalogo')}>Atras</button>
        <button className="BotonCarrito" onClick={() => navigate('/Carrito')}>Ir al carrito</button>
        {mensajeVisible && <div className={`mensaje-agregado ${mensajeOculto ? 'oculto' : ''}`}>Producto agregado!</div>}
        
      </div>
    </div>
  );
}

export default Detalle;
