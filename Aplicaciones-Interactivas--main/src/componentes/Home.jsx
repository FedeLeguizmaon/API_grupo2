import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Catalogo from './Catalogo';
import Carrito from './Carrito';
import Navbar from './Navbar';
import "./estilos/HomeStyles.css"

const Home = () => {
  const navigate = useNavigate();
  const [mostrarCatalogo, setMostrarCatalogo] = useState(true);

  const handleVerCarrito = () => {
    navigate('/Catalogo');
  };

  return (
    <main>
      <header>
        <nav>
        </nav>
        <h1>Bienvenido a Remeras Originals</h1>
        <div className="tarjeta-mensaje" onClick={handleVerCarrito}>
          <h1>¡Clickea aca para Comprar tus mejores remeras en esta página!</h1>
        </div>
      </header>
      
      <footer>
        <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
};

export default Home;