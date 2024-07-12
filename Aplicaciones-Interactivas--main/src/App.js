import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Registro from './componentes/Registro';
import OpcionesLog from './componentes/OpcionesLog';
import Carrito from './componentes/Carrito';
import Home from './componentes/Home';
import Checkout from './componentes/Checkout';
import Descuentos from './componentes/Descuentos';
import GestionProductos from './componentes/GestionProductos';
import LogIn from './componentes/LogIn';
import Catalogo from './componentes/Catalogo';
import Detalle from './componentes/Detalle';
import LogOut from './componentes/LogOut';
import { CarritoContext, CarritoProvider } from './componentes/CarritoContext';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faUser, faCartShopping, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import { store } from './componentes/Redux/Store';
import MensajeDeRegistro from './componentes/mensajes/MensajeDeRegistro';
import MasOpciones from './componentes/MasOpciones';
import FormularioCambiarCorreo from './componentes/FormularioCambiarCorreo';
import FormularioCambiarContraseña from './componentes/FormularioCambiarContraseña';
import HistorialDePedidos from './componentes/HistorialDePedidos';

function Header() {
  const navigate = useNavigate();
  const { Contador } = useContext(CarritoContext);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const user = useSelector((state) => state.user);

  const handlerMostrarOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  const handlerAtras = () => {
    navigate(-1);
  }

  return (
    <header>
      <nav className='navegador'>
        <ul>
          <li><FontAwesomeIcon icon={faShirt} onClick={() => navigate('/')} /></li>
          <li><button onClick={() => navigate('/catalogo')}>Catálogo de Productos</button></li>
          {user.Rol === 'ADMIN' && (
            <li><button onClick={() => navigate('/gestion-productos')}>Gestión de Productos</button></li>
          )}
          <li><FontAwesomeIcon icon={faCartShopping} onClick={() => navigate('/Carrito')} /></li>
          <li><FontAwesomeIcon icon={faUser} onClick={handlerMostrarOpciones} /></li>
          <li><FontAwesomeIcon icon={faArrowLeft} onClick={handlerAtras} /></li>
          {mostrarOpciones && <OpcionesLog />}
          {Contador > 0 && <li className="CantElementosCarrito">{Contador}</li>}
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Provider store={store}>
      <CarritoProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path='/historial' element={<HistorialDePedidos />} />
              <Route path='/formCor' element={<FormularioCambiarCorreo />} />
              <Route path='/formCon' element={<FormularioCambiarContraseña />} />
              <Route path='/MasOpciones' element={<MasOpciones />} />
              <Route path='/Registro' element={<Registro />} />
              <Route path='/LogIn' element={<LogIn />} />
              <Route path='/Opciones' element={<OpcionesLog />} />
              <Route path="/" element={<Home />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/descuentos" element={<Descuentos />} />
              <Route path="/gestion-productos" element={<GestionProductos />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path='/Detalle' element={<Detalle />} />
              <Route path='/MensajeRegistro' element={<MensajeDeRegistro />} />
              <Route path='/LogOut' element={<LogOut />} />
            </Routes>
          </div>
        </Router>
      </CarritoProvider>
    </Provider>
  );
}

export default App;
