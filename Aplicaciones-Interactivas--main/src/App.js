import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Carrito from './componentes/Carrito';
import Home from './componentes/Home';
import Checkout from './componentes/Checkout';
import Descuentos from './componentes/Descuentos';
import GestionProductos from './componentes/GestionProductos';
import Catalogo from './componentes/Catalogo';
import './styles.css';


function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/gestion-productos">Gestión de Productos</Link></li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;