import { useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { deleteProduct } from "./Redux/ProductoSlice";
import { useNavigate } from "react-router-dom";

const FormularioBorrarProductos =()=>{
    
    const user = useSelector((state) => state.user);
    const [retorn,setRetorno] = useState(false);
    const productoSeleccionado = useSelector((state) => state.producto.productoSeleccionado);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleRegreso=()=>{
        setRetorno(false);
        navigate('/');
    }
    const handleBorrar = async () => {
        try {
            console.log(productoSeleccionado.nombre);
            const response = await fetch(`http://localhost:4002/productos/borrarProducto/${productoSeleccionado.nombre}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.Token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(deleteProduct());
                setMessage(` ${data.message}`)
                setRetorno(true)
                
            } else {
                setMessage(`Error: ${data.message}`);
                
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            setMessage(`Error: ${error.message}`);
            
        }
    };

    return (
        <>
            <div>
                {!retorn && (
                    <>
                        <p>¿Está seguro de que desea eliminar el producto {productoSeleccionado.nombre}?</p>
                        <button onClick={handleBorrar}>Borrar Producto</button>
                    </>
                )}
                {message && <p>{message}</p>}
                {retorn && <button onClick={handleRegreso}>Regresar</button>}
            </div>
        </>
    );
}

export default FormularioBorrarProductos;