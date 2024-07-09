import React, { useContext, useState } from "react";
import './estilos/DetalleStyles.css';
import { CarritoContext } from './CarritoContext';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
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
    console.log(productoSeleccionado.nombre)
    console.log(productoSeleccionado.Imagen)
    console.log(productoSeleccionado.precio)
    agregarAlCarrito(productoSeleccionado.nombre,productoSeleccionado.Imagen,productoSeleccionado.precio);
    
    
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
        <button className="add-to-cart" onClick={() => handleAgregarAlCarrito(producto.nombre, parseInt(producto.precio))}>Agregar al Carrito</button>
        <button className="BotonAtras" onClick={() => navigate('/Catalogo')}>Atras</button>
        <button className="BotonCarrito" onClick={() => navigate('/Carrito')}>Ir al carrito</button>
        {mensajeVisible && <div className={`mensaje-agregado ${mensajeOculto ? 'oculto' : ''}`}>Producto agregado!</div>}
        
      </div>
    </div>
  );
}

export default Detalle;
