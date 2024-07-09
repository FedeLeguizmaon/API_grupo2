import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; 
import { useNavigate } from 'react-router-dom';
  
import './estilos/CatalogoStyles.css';
import { useSelector, useDispatch } from "react-redux";
import { addProduct, selectProduct } from './Redux/ProductoSlice';
const Catalogo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:4002/productos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.Token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.content);
        setProductos(data.content);

        
        data.content.forEach(producto => {
          dispatch(addProduct(producto)
          
        );
        console.log(producto.nombre)
        console.log(producto.image)
        });
      } catch (error) {
        console.error('Error al buscar el producto:', error);
      }
    }; 
    fetchProductos();
  }, [user.Token, dispatch]);

    const abrirDetalle = (producto) => {
      dispatch(selectProduct(producto));
      navigate('/Detalle', { state: { producto } });
    };
  

  return (
    <div>
      <h1 className='titulo' >Camisetas Originals</h1> 
      <Navbar />
      <h1 className='subtitulo'>Catalogo de productos</h1>
      <div className='productos'>
        {productos.map(producto => (
          <div onClick={() => abrirDetalle(producto)} className='product'>
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <img src={producto.image} alt={producto.nombre} style={{ width: '150px' }} />
            
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