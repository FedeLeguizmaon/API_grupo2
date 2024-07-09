import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormularioModificarProducto from "./FormularioModificarProducto";
import FormularioBorrarProducto from "./FormularioBorrarProductos";
import { almacenaProduct } from "./Redux/ProductoSlice";
import { addProduct,selectProduct } from "./Redux/ProductoSlice";
const FormularioBuscarProducto = ({busca}) => {
    const [buscado, setBuscado] = useState("");
    const user = useSelector((state) => state.user);
    const productos = useSelector((state) => state.producto.productos);
    const productoSeleccionado = useSelector((state) => state.producto.productoSeleccionado);
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [productoB, setProductoB] = useState("");
    const [encontro, setEncontro] = useState(false);
    const [error, setError] = useState(false);
    
    const buscarProducto = async () => {
        try {
            const response = await fetch(`http://localhost:4002/productos/productos/nombre/${buscado}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.Token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${data.message}`);
            }
    
            const data = await response.json();
            console.log("buscador")
            console.log(data);
    
            if (data.length >= 0) {
                console.log(data[0])
                dispatch(selectProduct(data[0])); // Selecciona el primer producto como producto seleccionado
                console.log(productoSeleccionado.nombre)
                setEncontro(true);
                setError(false);
            } else {
                setError("No se encontraron productos.");
                setEncontro(false);
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            setError(`Error: No se encontraron productos con ese nombre.`);
            setEncontro(false);
        }
    };

    return (
        <>
            <input
                value={buscado}
                onChange={(e) => setBuscado(e.target.value)}
                placeholder="Ingrese el nombre del producto a modificar"
            />
            <button onClick={buscarProducto}>Buscar Producto</button>
            {error && <p>{error}</p>}
            {encontro && busca=="m" && < FormularioModificarProducto />}
            {encontro && busca=="e" && < FormularioBorrarProducto />}
        </>
    );
};

export default FormularioBuscarProducto;