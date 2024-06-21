import React, { useState } from 'react';
import Catalogo from './Catalogo';
import Carrito from './Carrito';
import Navbar from './Navbar';
import "./estilos/HomeStyles.css"


import { useNavigate } from 'react-router-dom';

const Home = () => {
  
  const navigate = useNavigate();
  const[mostarCatalogo,setMostrarCatalogo] = useState(true);
  const handleVerCarrito = () => {
    navigate('/Carrito')
  };

  return (
    <main>
      
      <header>
      
        <nav>
          <ul>
            <li><button onClick={handleVerCarrito}>!Comenzar a Comprar!</button></li>
            
          </ul>
        </nav>
      </header>
    </main>
  );
};

export default Home;