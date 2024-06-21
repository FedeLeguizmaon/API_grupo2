import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './estilos/CatalogoStyles.css';
import Detalle from './Detalle';

function Catalogo(props) {
  const [productos, setProductos] = useState([]);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
      {mostrarDetalle && <Detalle producto={productoSeleccionado} cerrarDetalle={cerrarDetalle} props={props}/>}
    </div>
  );
}

export default Catalogo;
