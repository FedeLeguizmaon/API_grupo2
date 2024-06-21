import Descuentos from './Descuentos';
import React, { useState } from 'react';

const Checkout = function(props) {
    const [mostrarDescuentos, setMostrarDescuentos] = useState(false);
    const [precioTotal, setPrecioTotal] = useState(props.totalPrecios);
    const [mostrarMetodo,setMostrarMetodo] = useState(true)
   
    const actualizarPrecio = (nuevoPrecio) => {
        setPrecioTotal(nuevoPrecio);
    }

    const ElegirMetodoDePago = () => {
        setMostrarDescuentos(true);
    }
    
    const MostrarMetodo =()=>{
        setMostrarMetodo(false);
    }
   
    
    return( 
        <>
            {!mostrarMetodo && <h1>compra exitosa</h1>}
            <h2>Precio de la compra: {precioTotal}</h2>

            {mostrarMetodo &&!mostrarDescuentos && <button onClick={ElegirMetodoDePago}>Eligir Metodo De Pago</button>}
            { mostrarDescuentos && <Descuentos actualizarPrecio={actualizarPrecio} totalPrecios={precioTotal} 
             setMostrarDescuentos={setMostrarDescuentos} mostrarDescuentos={mostrarDescuentos} 
             setMostrarMetodo={setMostrarMetodo} mostrarMetodo={mostrarMetodo} />}
           
        </>
    );
}

export default Checkout;