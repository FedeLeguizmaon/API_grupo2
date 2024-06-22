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
        <h1 className='bienvenido'>BIENVENIDOS A CAMISETAS ORIGINALS</h1>
        <div className="tarjeta-mensaje" onClick={handleVerCarrito}>
          <h1>¡Compra tus mejores remeras!</h1>
        </div>
      </header>
      <div className="Tipo_de_Remeras">
    <div className="card">Disfruta de las mejores camisetas de selección aquí</div>
    <img></img>
    <div className="card">Disfruta de las mejores camisetas de Equipos Argentinos aquí</div>
    <div className="card">Disfruta de las mejores camisetas de Equipos Extranjeros aquí</div>
</div>
      <footer className='footer'>
        <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
};

export default Home;