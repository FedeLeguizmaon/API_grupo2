import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; 
import { useNavigate } from 'react-router-dom';
import './estilos/CatalogoStyles.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4002/productos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
    },
      
    }).then((response) => response.json()).then((data) => {
      if (data.message) {
        console.log("Error GET products: ", data.message);
    } else {
        console.log(data)
        console.log("hasta aca ok");
        setProductos(data);
    }
    }).catch((error) => console.log("ERROR:", error))
  }, []);

  const abrirDetalle = (producto) => {
    navigate('/Detalle', { state: { producto } });
  };
  

  return (
    <div>
      <h1 className='titulo' >Camisetas Originals</h1> 
      <Navbar />
      <h1 className='subtitulo'>Catalogo de productos</h1>
      <div className='productos'>
        {productos.map(producto => (
          <div onClick={() => abrirDetalle(producto)} key={producto.id} className='product'>
            <h3>{producto.Name}</h3>
            <p>Precio: ${producto.Precio}</p>
            <img src={producto.Imagen} alt={producto.Name} style={{ width: '150px' }} />
            
          </div>
        ))}
      </div>
      <footer className='footer'>
  <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
</footer>
    </div>
  );
};

export default Catalogo;