import { useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { addProduct, changeProduct } from "./Redux/ProductoSlice";
import { deleteProduct } from "./Redux/ProductoSlice";

const FormularioBorrarProductos =()=>{
    
    const user = useSelector((state) => state.user);
    const productos = useSelector((state) => state.productos);
    
    const productoSeleccionado = useSelector((state) => state.producto.productoSeleccionado);
    const dispatch = useDispatch()
    const [message, setMessage] = useState("");
    const handleBorrar = async () => {
        try {
            
            
            
                if (!productoSeleccionado || !productoSeleccionado.Nombre) {
                    setMessage("No se ha encontrado ningún producto para borrar.");
                    return;
                }
                const primerProducto = productos[0];
            console.log(primerProducto.Nombre)
            const response = await fetch(`http://localhost:4002/productos/borrarProducto/${productoSeleccionado.Nombre}`, {
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
         <div>
         <p>¿Está seguro de que desea eliminar el producto {productoSeleccionado && productoSeleccionado.Nombre}?</p>
                <button onClick={handleBorrar}>Borrar Producto</button>
            </div>
            {message && <p>{message}</p>}
        
        </>
    )
}
export default FormularioBorrarProductos;