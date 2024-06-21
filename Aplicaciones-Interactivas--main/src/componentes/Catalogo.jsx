import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Detalle from './Detalle';
import Navbar from './Navbar'; 
import { useNavigate } from 'react-router-dom';
import './estilos/CatalogoStyles.css';
import { CarritoContext } from './CarritoContext';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, []);

  const abrirDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarDetalle(true);
  };

  const cerrarDetalle = () => {
    setMostrarDetalle(false);
  };

  return (
    <div>
      <Navbar />
      <h1>Catálogo de Productos</h1>
      <div className='productos'>
        {productos.map(producto => (
          <div key={producto.id} className='product'>
            <h3>{producto.Name}</h3>
            <p>Precio: ${producto.Precio}</p>
            <img src={producto.Imagen} alt={producto.Name} style={{ width: '100px' }} />
            <button onClick={() => abrirDetalle(producto)}>Abrir detalle</button>
          </div>
        ))}
      </div>
      {mostrarDetalle && (
        <Detalle
          producto={productoSeleccionado}
          cerrarDetalle={cerrarDetalle}
        />
      )}
    </div>
  );
};

export default Catalogo;