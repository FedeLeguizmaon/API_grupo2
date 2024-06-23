import React, { useContext } from "react";
import './estilos/DetalleStyles.css';
import { CarritoContext } from './CarritoContext';
import { useLocation, useNavigate } from "react-router-dom";

const Detalle = () => {
  const location = useLocation();
  const producto = location.state.producto;
  const navigate = useNavigate();
  const { agregarAlCarrito, eliminarDelCarrito } = useContext(CarritoContext);

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
        <button className="add-to-cart" onClick={() => agregarAlCarrito(producto.Name, parseInt(producto.Precio))}>Agregar al Carrito</button>
        <button className="BotonAtras" onClick={() => navigate('/Catalogo')}>Atras</button>
        <button className="BotonCarrito" onClick={() => navigate('/Carrito')}>Ir al carrito</button>
      </div>
    </div>
  );
};

export default Detalle;