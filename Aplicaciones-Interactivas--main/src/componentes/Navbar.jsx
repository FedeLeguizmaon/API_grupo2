import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './estilos/NavbarStyles.css'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [productosEncontrados, setProductosEncontrados] = useState(true);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

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
          
        } catch (error) {
          console.error('Error al buscar el producto:', error);
        }
      }; 
      fetchProductos();
    }, []);


    // Función para filtrar los productos en función del término de búsqueda
    const filteredProductos = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para filtrar los productos en función del rango de precios
    const priceFilteredProductos = filteredProductos.filter(producto =>
      (!minPrice || parseInt(producto.precio) >= parseInt(minPrice)) &&
      (!maxPrice || parseInt(producto.precio) <= parseInt(maxPrice))
    );

    useEffect(() => {
      if (searchTerm && priceFilteredProductos.length === 0) {
        setProductosEncontrados(false);
      } else {
        setProductosEncontrados(true);
      }
    }, [searchTerm, priceFilteredProductos]);


    return (
        <div className="navbar-container">
        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input-search"
        />
        {/* Filtro por precio */}
        <div className="price-filters">
          <input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
          />
          -
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="results">
          {!productosEncontrados && <p className="products-found">No se encontraron productos.</p>}
          {(searchTerm || maxPrice || minPrice) && priceFilteredProductos.length > 0 && (
            priceFilteredProductos.map(producto => (
              <article className="article">
                  <div>
                    <h3>{producto.nombre}</h3>
                    <p>Precio: ${producto.precio}</p>
                    <img src={producto.image} alt={producto.nombre} style={{ width: '100px' }} />
                    <br />
                    <button onClick={() => { navigate('/Detalle', {state: {producto}}) }}>Abrir detalle</button>
                  </div>
              </article>
              ))
            )}
            </div>
        </div>
    );
}

export default Navbar;