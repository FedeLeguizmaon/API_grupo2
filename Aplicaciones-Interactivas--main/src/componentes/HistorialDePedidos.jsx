import { useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { addProduct, changeProduct } from "./Redux/ProductoSlice";
import { deleteProduct } from "./Redux/ProductoSlice";

const HistorialDePedidos=()=>{
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const [message, setMessage] = useState("");
    const handlerHistorial = async ()=>{
        try {
            const response = await fetch(`http://localhost:4002/Pedido/historial?mail=${user.Mail}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.Token}`,
                }
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setMessage(`${data.message}`);
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            setMessage(`Error: ${error.message}`);
        }
    };
    return(
        <>
        <h1>Pedidos de {user.Nombre} {user.Apellido}</h1>
        <h1>Hice la logica del fetch falta Ver donde guardarlos, supongo que plantearemos redux, o como vos hagas el catalogo aca tendria que ser parecido</h1>
        </>
    )
}
export default  HistorialDePedidos;