// Descuentos.js
import React, { useContext } from 'react';
import './estilos/CheckoutStyles.css';
import { CarritoContext } from './CarritoContext';
import { useSelector } from 'react-redux';

const Descuentos = function(props) {
    const { carrito } = useContext(CarritoContext);
    const user = useSelector((state) => state.user);
    let tipoD = 0;

    const handlerVerDesc = async () => {
        try {
            const mail = user.Mail;
            const response = await fetch(`http://localhost:4002/Usuario/mail/${mail}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.Token}`
            }});
            if (response.ok) {
                const data = await response.json();
                let idUsuario = data.id;
                let idproductos = [];
                console.log(carrito);
                for (let i=0; i < carrito.length; i++) {
                    idproductos[i] = carrito[i].Id;
                }
                console.log(idproductos);
                const pedidoResponse = await fetch('http://localhost:4002/Pedido', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.Token}`
                    },
                    body: JSON.stringify({idUsuario, idproductos, tipoD})
                })
                if (!pedidoResponse.ok) {
                    console.log("Error al crear pedido: ", pedidoResponse.status);
                }
            }
        } catch(error) {
            console.error("Se ha producido un error:", error)
        }
    };

    const metodoDePagoC = () => {
        tipoD = 2;
    }

    const metodoDePagoD = () => {
        tipoD = 1;
    }

    return(
        <>
        <h3>Elegí tu método de pago</h3>
        <div className="pago-container">
            <button className='boton' onClick={() => { metodoDePagoC(); handlerVerDesc(); }}>Tarjeta de crédito</button>
            <p className='mensaje-de-descuento'>Comprando con Tarjeta de crédito tenes un 5% de descuento</p>
        </div>
        <div className="pago-container">
            <button className='boton' onClick={() => { metodoDePagoD(); handlerVerDesc(); }}>Tarjeta de débito</button>
            <p className='mensaje-de-descuento'>Comprando con Tarjeta de débito tenes un 10% de descuento</p>
        </div>
    </>
    )
}
export default Descuentos;
