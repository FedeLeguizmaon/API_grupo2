import React, { useContext } from "react";
import './estilos/DetalleStyles.css';
import { CarritoContext } from './CarritoContext';

const Detalle = ({ producto, cerrarDetalle }) => {
  const { agregarAlCarrito, eliminarDelCarrito } = useContext(CarritoContext);

  return (
    <div className='detail'>
      <button className="close-button" onClick={cerrarDetalle}>X</button>
      <div key={producto.id}>
        <h3>{producto.Name}</h3>
        <p>{producto.Descripcion}</p>
        <p>Precio: ${producto.Precio}</p>
        <p>Stock: {producto.Stock}</p>
        <img src={producto.Imagen} alt={producto.Name} style={{ width: '100px' }} />
        <br />
        <button onClick={() => agregarAlCarrito(producto.Name, parseInt(producto.Precio))}>Comprar</button>
        <button onClick={() => eliminarDelCarrito(producto.Name, parseInt(producto.Precio))}>Eliminar del carrito</button>
      </div>
    </div>
  );
};

export default Detalle;