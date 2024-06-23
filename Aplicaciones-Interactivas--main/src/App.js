import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Carrito from './componentes/Carrito';
import Home from './componentes/Home';
import Checkout from './componentes/Checkout';
import Descuentos from './componentes/Descuentos';
import GestionProductos from './componentes/GestionProductos';
import Catalogo from './componentes/Catalogo';
import Detalle from './componentes/Detalle';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { CarritoProvider } from './componentes/CarritoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <nav className='navegador'>
      
        <ul>
          <li><FontAwesomeIcon icon={faShirt} onClick={() => navigate('/')}  /></li> 
          <li><button onClick={() => navigate('/catalogo')}>Catálogo de Productos</button></li>
          <li><button onClick={() => navigate('/gestion-productos')}>Gestión de Productos</button></li>
          <li><button onClick={() => navigate('/Carrito')}>Carrito</button></li>
        
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <CarritoProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/descuentos" element={<Descuentos />} />
            <Route path="/gestion-productos" element={<GestionProductos />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path='Detalle' element={<Detalle />} />
          </Routes>
        </div>
      </Router>
    </CarritoProvider>
  );
}

export default App;