import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './estilos/CatalogoStyles.css';
import { useNavigate } from "react-router-dom";

const HistorialDePedidos = () => {
    const user = useSelector((state) => state.user);
    const [pedidos, setPedidos] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const handlerHistorial = async () => {
            try {
                const response = await fetch(`http://localhost:4002/Pedido/historial/${user.Mail}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.Token}`,
                    }
                });
    
                const data = await response.json();
    
                if (response.ok) {              
                    // Actualizar el estado de pedidos usando setPedidos
                    setPedidos(data);
                } else {
                    console.log(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error al buscar el producto:', error);
            }
        };
        handlerHistorial();
    }, [user.Mail, user.Token]);

    const abrirDetalle = (producto) => {
        navigate('/Detalle', { state: { producto } });
    };

    const calcularPrecioTotal = (productos) => {
        return productos.reduce((total, producto) => total + producto.precio, 0);
    };

    return (
        <>
            {console.log(pedidos)}
            {console.log("nashe")}
            <h1>Tus pedidos</h1>
            {pedidos.length > 0 ? (
                <div className="pedidos">
                    {pedidos.map((pedido, index) => (
                        <div key={index} className="pedido">
                            <h2>Pedido {index + 1}</h2>
                            <div className="productos">
                                {pedido.productos.map((producto, prodIndex) => (
                                    <div key={prodIndex} className="product" onClick={() => abrirDetalle(producto)}>
                                        <h3>{producto.nombre}</h3>
                                        <p>Precio: ${producto.precio}</p>
                                        <img src={producto.image} alt={producto.nombre} style={{ width: '150px' }} />
                                    </div>
                                ))}
                            </div>
                            <h3>Cantidad de productos:{pedido.cantidad}</h3>
                            <h3>Precio total: {pedido.precioTotal}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay productos en el historial de pedidos.</p>
            )}
            <footer className='footer'>
                <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
            </footer>
        </>
    );
}

export default HistorialDePedidos;