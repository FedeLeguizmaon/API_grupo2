import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; 
import { useNavigate } from 'react-router-dom';
import './estilos/CatalogoStyles.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
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
    navigate('/Detalle', { state: { producto } });
  };
  

  return (
    <div>
      <h1 className='titulo' >Camisetas Originals</h1> 
      <Navbar />
      <h1 className='subtitulo'>Catálogo de Productos</h1>
      <div className='productos'>
        {productos.map(producto => (
          <div key={producto.id} className='product'>
            <h3>{producto.Name}</h3>
            <p>Precio: ${producto.Precio}</p>
            <img src={producto.Imagen} alt={producto.Name} style={{ width: '150px' }} />
            <button onClick={() => abrirDetalle(producto)}>Abrir detalle</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;