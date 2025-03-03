import React, { useContext } from 'react';
import './estilos/CheckoutStyles.css';
import { CarritoContext } from './CarritoContext';
import { useSelector } from 'react-redux';

const Descuentos = function(props) {
    const { carrito, productoIds, finalizarCompra} = useContext(CarritoContext);
    let {precioTotal}=useContext(CarritoContext);
    const user = useSelector((state) => state.user);
    let tipoD = 0;

    const handlerVerDesc = async () => {
        try {
            const idUsuario = user.Id;
            
            console.log(carrito);
            console.log("hola");
            console.log(tipoD);
            console.log(productoIds);
            console.log(user.Id)
            
            // Verificar el JSON que se va a enviar
            const requestBody = {
                idUsuario: idUsuario,
                productos: productoIds,
                tipoD: tipoD,
                precioTotal: precioTotal
            };
            console.log("JSON enviado al backend:", JSON.stringify(requestBody));

            const pedidoResponse = await fetch('http://localhost:4002/Pedido', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.Token}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!pedidoResponse.ok) {
                console.log("Error al crear pedido: ", pedidoResponse.status);
                
                const errorData = await pedidoResponse.json();
                console.error("Error details: ", errorData);
            } else {
                const pedidoData = await pedidoResponse.json();
                console.log("Respuesta del backend:", pedidoData);
                finalizarCompra();
                props.setMostrarMetodo(false);
                props.setMostrarDescuentos(false);
                
                console.log(pedidoData.precioTotal)
                props.setPrecioTotal(pedidoData.precioTotal)
            }
            
        } catch(error) {
            console.error("Se ha producido un error:", error);
        }
    };

    const metodoDePagoC = () => {
        tipoD = "c";
    }

    const metodoDePagoD = () => {
        tipoD = "d";
    
    }

    return (
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
    );
}

export default Descuentos;