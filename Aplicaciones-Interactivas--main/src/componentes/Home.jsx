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
    <div className="card">CAMISETAS SELECCIONES
    <img className="imagenes" src="https://cdn.iconscout.com/icon/free/png-256/free-fifa-2-283422.png" alt="Descripción de la imagen"></img>
    </div>
    
    <div className="card">CAMISETAS EQUIPOS ARGENTINOS
      <img className="imagenes" src="https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/1.png" alt=""></img>
    </div>
    <div className="card">CAMISETAS EQUIPOS DEL MUNDO
    <img className="imagenes" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdeVAOBgZ3cllBRmIG1-7aQfvDqGcaWjqY1A&s" alt=""></img>
    </div>
</div>
      <footer className='footer'>
        <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
};

export default Home;