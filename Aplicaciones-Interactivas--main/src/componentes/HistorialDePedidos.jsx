import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './estilos/CatalogoStyles.css';
import { useNavigate } from "react-router-dom";

const HistorialDePedidos = () => {
    const user = useSelector((state) => state.user);
    const [productos, setProductos] = useState([]);
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
                    // Extraer y aplanar la lista de productos de cada pedido
                    const productosPedidos = data.flatMap(pedido => pedido.productos);
                    
                    // Actualizar el estado de productos usando setProductos
                    setProductos(productosPedidos);
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
    return (
        <>
            {console.log(productos)}
            {console.log("nashe")}
            <h1>Tus pedidos</h1>
            {productos.length > 0 ? (
                <div className="productos">
                    {productos.map((producto, index) => (
                        <div key={index} className="product" onClick={() => abrirDetalle(producto)}>
                            <h3>{producto.nombre}</h3>
                            <p>Precio: ${producto.precio}</p>
                            <img src={producto.image} alt={producto.nombre} style={{ width: '150px' }} />
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
