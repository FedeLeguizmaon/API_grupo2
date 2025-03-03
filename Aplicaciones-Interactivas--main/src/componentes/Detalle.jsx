import React, { useContext, useState } from "react";
import './estilos/DetalleStyles.css';
import { CarritoContext } from './CarritoContext';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "./Redux/ProductoSlice";

const Detalle = () => {
  const location = useLocation();
  const producto = location.state.producto;
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeOculto, setMensajeOculto] = useState(false);
  const productoSeleccionado = useSelector((state) => state.producto.productoSeleccionado);
  const dispatch = useDispatch();

  const handleAgregarAlCarrito = () => {
    dispatch(selectProduct(producto));
    console.log(productoSeleccionado.id);
    console.log(productoSeleccionado.imagen);
    console.log(productoSeleccionado.precio);
    agregarAlCarrito(productoSeleccionado.id,productoSeleccionado.nombre,productoSeleccionado.imagen,productoSeleccionado.precio);
    
    
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
        <img className="image" src={producto.image} alt={producto.nombre} />
      </div>
      <div className="info">
        <h3 style={{ fontSize: 30 }}>{producto.nombre}</h3>
        <p style={{ fontSize: 25 }}>{producto.descripcion}</p>
        <p style={{ fontSize: 25 }}>Stock: {producto.stock}</p>
        <p style={{ fontSize: 30 }}>Precio: ${producto.precio}</p>
        {producto.stock > 0 ? (
          <button className="add-to-cart" onClick={() => {handleAgregarAlCarrito()}}>Agregar al Carrito</button>
        ) : (
          <p style={{ fontSize: 30 }}>No hay suficiente stock!</p>
        )}
        <button className="BotonAtras" onClick={() => navigate('/Catalogo')}>Atras</button>
        <button className="BotonCarrito" onClick={() => navigate('/Carrito')}>Ir al carrito</button>
        {mensajeVisible && <div className={`mensaje-agregado ${mensajeOculto ? 'oculto' : ''}`}>Producto agregado!</div>}
        
      </div>
    </div>
  );
}

export default Detalle;
