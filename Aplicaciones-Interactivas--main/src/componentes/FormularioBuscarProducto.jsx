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

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                if (data.length >= 0) {
                    dispatch(addProduct(data[0])); // Añade el primer producto del array (asumiendo que solo hay uno)
                    dispatch(selectProduct(data[0])); // Selecciona el primer producto como producto seleccionado
                  }
                setEncontro(true);
                setError(false);
            } else {
                setError(`Error: ${data.message}`);
                setEncontro(false);
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            setError(`Error: ${error.message}`);
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