import React, { useState } from 'react';
import Catalogo from './Catalogo';
import Carrito from './Carrito';
import Navbar from './Navbar';
import "./estilos/HomeStyles.css"

const Home = function({ children }) {
    const [mostrarCompra, setMostrarCompra] = useState(true);
    //estado para ver el catalogo
    const[mostarCatalogo,setMostrarCatalogo] = useState(true);

    // estado para mostrar el mensaje de Checkout
    const [mostrarCheckout, setMostrarCheckout] = useState(false);
    // Estado para controlar si se muestra el carrito o no
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    // Estado para los elementos del carrito
    const [carrito, setCarrito] = useState([]);

    // Funcion para agregar un producto al carrito
    const agregarAlCarrito = (producto,precio) => {
        setCarrito([...carrito, { producto: producto, precio: precio }]);
    };

    // Funcion para eliminar del carrito
    const eliminarDelCarrito = (productoAEliminar,precio) => {
        // Encuentra el índice del primer producto que coincida con el producto a eliminar
        const index = carrito.findIndex(item => item.producto === productoAEliminar && item.precio === precio)
        if (index !== -1) {
            // Crea un nuevo array copiando los elementos antes del índice y después del índice
            const nuevoCarrito = [...carrito.slice(0, index), ...carrito.slice(index + 1)];
            // Establece el nuevo carrito
            setCarrito(nuevoCarrito);
        }
    };

    // Funcion para manejar el clic en Ver Carrito
    const handleVerCarrito = () => {
        setMostrarCarrito(!mostrarCarrito);
        setMostrarCompra(true)
        cerrarCheckout()
    };

    // Función para ocultar el mensaje de compra exitosa
    const cerrarCheckout = () => {
        setMostrarCheckout(false);
    };

    return (
        <main>
            <header>
                <nav>
                    <ul>
                        <li onClick={handleVerCarrito}>Ver/Cerrar Carrito</li>
                    </ul>
                </nav>
            </header>
            {/* Mostrar el contenido del carrito si mostrarCarrito es true */}
            {mostrarCarrito && (<Carrito carrito={carrito} setCarrito={setCarrito} />)}

            {<Navbar carrito={carrito} agregarAlCarrito={agregarAlCarrito} 
            eliminarDelCarrito={eliminarDelCarrito}/>}

            {/*Como mostrar el catalogo */}
            {mostarCatalogo && <Catalogo agregarAlCarrito={agregarAlCarrito} 
            eliminarDelCarrito={eliminarDelCarrito} />}
        </main>
    );
};

export default Home;