// Descuentos.js
import React from 'react';
import axios from 'axios';
import './estilos/CheckoutStyles.css';

const Descuentos = function(props) {
    let tipoD = 0;
    let { totalPrecios } = props;
    
    const getIdCarrito = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/compras`);
            const data = res.data;
            const ultimoElemento = data[data.length - 1];
            return ultimoElemento;
        } catch(error) {
            console.error("Se ha producido un error:", error)
        }
    }

    const handlerVerDesc = async () => {
        try {
            const ultimoElemento = await getIdCarrito();
            const id = ultimoElemento.id;
    
            if (tipoD === 2) {
                props.actualizarPrecio(metodoDePagoC());
                await axios.delete(`http://localhost:3001/compras/${id}`);
                await axios.post(`http://localhost:3001/compras`, {
                    carrito: { ...ultimoElemento.Elementos },
                    precio_total: metodoDePagoC()
                });
            } else if (tipoD === 1) {
                props.actualizarPrecio(metodoDePagoD());
                await axios.delete(`http://localhost:3001/compras/${id}`);
                await axios.post(`http://localhost:3001/compras`, {
                    carrito: { ...ultimoElemento.Elementos },
                    precio_total: metodoDePagoD()
                });
            } else {
                props.actualizarPrecio(totalPrecios);
                await axios.delete(`http://localhost:3001/compras/${id}`);
                await axios.post(`http://localhost:3001/compras`, {
                    carrito: { ...ultimoElemento.Elementos },
                    precio_total: totalPrecios
                });
            }
            props.setMostrarDescuentos(false);
            props.setMostrarMetodo(false)
        } catch(error) {
            console.error("Se ha producido un error:", error)
        }
    };

    const metodoDePagoC = () => {
        const desc = totalPrecios * 0.05;
        const precioConDescuento = totalPrecios - desc;
        tipoD = 2;
        return precioConDescuento;
    }

    const metodoDePagoD = () => {
        const desc = totalPrecios * 0.1;
        const precioConDescuento = totalPrecios - desc;
        tipoD = 1;
        return precioConDescuento;
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
