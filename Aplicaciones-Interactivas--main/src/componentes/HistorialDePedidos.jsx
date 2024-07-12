import { useState, useEffect } from "react"
import { useDispatch,useSelector } from "react-redux";
import { addProduct, changeProduct } from "./Redux/ProductoSlice";
import { deleteProduct } from "./Redux/ProductoSlice";
import './estilos/CatalogoStyles.css';

const HistorialDePedidos=()=>{
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const [message, setMessage] = useState("");
    const [productos, setProductos] = useState([]);
    useEffect(() => {
    const handlerHistorial = async ()=>{
        try {
            console.log(user.Mail)
            const response = await fetch(`http://localhost:4002/Pedido/historial/${"nicolasSicalo@gmail.com"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.Token}`,
                }
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log("data:")
                console.log(data)
                setMessage(`${data.message}`);
                // 
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            setMessage(`Error: ${error.message}`);
        }
    };
    handlerHistorial();
    }, [user.Mail, user.Token] )
    return(
        <>
        {console.log(productos)}
        {console.log(user.Nombre)}
        {console.log("nashe")}
        <h1>Pedidos de {user.Nombre} {user.Apellido}</h1>
    
        </>
    )
}
export default  HistorialDePedidos;