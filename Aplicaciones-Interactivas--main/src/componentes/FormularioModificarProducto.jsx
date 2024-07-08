import { useState,useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";
import { addProduct, changeProduct } from "./Redux/ProductoSlice";

const FormularioModificarProducto = (producto) => {
    const[buscado,setBuscado]=useState("");
    const [newid, setnId] = useState("");
    const [newnombre, setnNombre] = useState("");
    const [newdescripcion, setnDescripcion] = useState("");
    const [newstock, setnStock] = useState("");
    const [newprecio, setnPrecio] = useState("");
    const [newimagen, setnImagen] = useState("");
    const [newtalle, setnTalle] = useState("");
    const user = useSelector((state) => state.user);
    
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [productoB,setProductoB]= useState("");
    const [encontro,setEncontro] = useState(false);
    const[error,setError]= useState(false)
    
   
    const handleModificar = async () => {
        try {
            const response = await fetch("http://localhost:4002/productos/editProducto", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.Token}`,
                },
                body: JSON.stringify({
                    id: newid,
                    nombre: newnombre,
                    descripcion: newdescripcion,
                    stock: newstock,
                    precio: newprecio,
                    imagen: newimagen,
                    talle: newtalle
                }),
            });
        const data = await response.json();
        if (response.ok) {
            dispatch(
                changeProduct(
                    {Id: newid, 
                        Nombre: newnombre,
                         Descripcion: newdescripcion, 
                         Stock: newstock, 
                         Precio: newprecio, 
                         Imagen: newimagen, 
                         Talle: newtalle}));
                         console.log(producto.Nombre)
                         setMessage("Producto editado exitosamente");
                        } else {
                            setMessage(`Error: ${data.message}`);
                        }
                    } catch (error) {
                        console.log("ERROR: ", error);
                        setMessage(`Error: ${error.message}`);
                    }
                };

    return(
        <>
        <br></br>
        <br></br>
         <div className="addProduct">
            
                <label className="etiqueta">Modifica el producto:</label>
                <input type="Id" placeholder="Ingrese el nuevo  id" value={newid} onChange={(e) => setnId(e.target.value)} />
                <input type="Nombre" placeholder="Ingrese el nuevo  nombre" value={newnombre} onChange={(e) => setnNombre(e.target.value)} />
                <input type="Descripcion" placeholder="Ingrese la nueva descripcion" value={newdescripcion} onChange={(e) => setnDescripcion(e.target.value)} />
                <input type="Stock" placeholder="Ingrese el nuevo stock" value={newstock} onChange={(e) => setnStock(e.target.value)} />
                <input type="Precio" placeholder="Ingrese el nuevo precio" value={newprecio} onChange={(e) => setnPrecio(e.target.value)} />
                <input type="Imagen" placeholder="Ingrese una nueva imagen" value={newimagen} onChange={(e) => setnImagen(e.target.value)} />
                <input type="Talle" placeholder="Ingrese otro talle" value={newtalle} onChange={(e) => setnTalle(e.target.value)} />
                <button onClick={handleModificar} type="submit">Guardar Cambios</button>
            </div>
            
            {message && <p>{message}</p>}
        </>
    )
}


export default FormularioModificarProducto;