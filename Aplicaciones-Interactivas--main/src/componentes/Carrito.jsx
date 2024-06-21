import React, { useState } from 'react';
import Checkout from './Checkout';
import axios from 'axios';

const Carrito = ({carrito, setCarrito}) => {
    const [totalPrecios, setTotalPrecios] = useState(0);
    const [mostrarCheckout, setMostrarCheckout] = useState(false);
    const [mostrarCompra, setMostrarCompra] = useState(true);

    const finalizarCompra = () => {
        // Mostrar el mensaje de compra exitosa
        setMostrarCheckout(true);

        let totalPreciosTemp = 0;
        // Recorrer el carrito con un bucle for
        for (let i = 0; i < carrito.length; i++) {
            // Obtener el precio del elemento actual y agregarlo al total
            totalPreciosTemp += carrito[i].precio;
        }
   
        setTotalPrecios(totalPreciosTemp);

        // Limpiar el carrito
        setCarrito([]);
    }

    const saveCarrito = async () => {
        try {
            const response = await axios.post('http://localhost:3001/compras', {
                Elementos: carrito
            })
            return response
        } catch(error) {
            console.error('Error al cargar la compra:', error);
        }
    }

    return(
        <div>
            <h2>Carrito de compras</h2>
            <br />
            
            {mostrarCompra &&<button onClick={() => {finalizarCompra(); saveCarrito();setMostrarCompra(false)} }>Realizar Compra</button>}
            {mostrarCheckout && <Checkout totalPrecios={totalPrecios}/>}

            <ul>
                {carrito.map((item, index) => {
                    return(<li key={index}> {item.producto} - {item.precio}</li>);
                })}

            </ul>
        </div>
    )
}


export default Carrito;