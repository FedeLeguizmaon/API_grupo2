import { useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { addProduct } from "./Redux/ProductoSlice";


const FormularioAgregarProducto = () => {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stock, setStock] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [talle, setTalle] = useState("");
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const handleAgregar = async () => {
        try {
            const response = await fetch("http://localhost:4002/productos/createProducto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.Token}`,
            },
            body: JSON.stringify({id, nombre, descripcion, stock, precio, imagen, talle})
        })
        const data = await response.json();
        if (response.ok) {
            dispatch(addProduct({Id: id, Nombre: nombre, Descripcion: descripcion, Stock: stock, Precio: precio, Imagen: imagen, Talle: talle}));
            setMessage("Producto creado exitosamente");
        } else setMessage(`Error: ${data.message}`)
        } catch (error) {
            console.log("ERROR: ", error);
            setMessage()
        }
    }

    return(
        <>
            <div className="addProduct">
                <label className="etiqueta">Agregue un producto</label>
                <input type="Id" placeholder="Ingrese el id" value={id} onChange={(e) => setId(e.target.value)} />
                <input type="Nombre" placeholder="Ingrese el nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="Descripcion" placeholder="Ingrese la descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <input type="Stock" placeholder="Ingrese el stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                <input type="Precio" placeholder="Ingrese el precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                <input type="Imagen" placeholder="Ingrese la imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                <input type="Talle" placeholder="Ingrese el talle" value={talle} onChange={(e) => setTalle(e.target.value)} />
                <button onClick={handleAgregar} type="submit">Agregar producto</button>
            </div>
            {message && <p>{message}</p>}
        </>
    )
}
export default FormularioAgregarProducto;