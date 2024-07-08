import React, { useState } from 'react';
import axios from 'axios';
import FormularioAgregarProducto from "./FormularioAgregarProducto";
import FormularioModificarProducto from './FormularioModificarProducto';
import { useNavigate } from 'react-router-dom';
import FormularioBuscarProducto from './FormularioBuscarProducto';
/*
function AgregarProducto({ onAdd }) {
    const [producto, setProducto] = useState({
        Id: "",
        Nombre: "",
        Descripcion: "",
        Stock: "",
        Precio: "",
        Imagen: "",
        Talle: ""
    });

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:4002/Usuario/${user.Mail}/${newPassword}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.Token}`,
            },
        });
            alert('Producto agregado correctamente');
            setProducto({ Id: "", Nombre: '', Descripcion: '', Precio: '', Stock: '', Imagen: '', Talle: '' }); // Limpiar formulario
            onAdd();
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            alert('Error al agregar el producto');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="Nombre" value={producto.Nombre} onChange={handleChange} placeholder="Nombre del Producto" />
            <input name="Descripcion" value={producto.Descripcion} onChange={handleChange} placeholder="Descripción" />
            <input name="Precio" type="number" value={producto.Precio} onChange={handleChange} placeholder="Precio" />
            <input name="Stock" type="number" value={producto.Stock} onChange={handleChange} placeholder="Stock" />
            <input name="Imagen" value={producto.Imagen} onChange={handleChange} placeholder="URL de la Imagen" />
            <input name="Talle" value={producto.Talle} onChange={handleChange} placeholder="Talle del Producto" />
            <button type="submit">Agregar Producto</button>
        </form>
    );
}*/

/*function ModificarProducto({ onUpdate }) {
    const [id, setId] = useState('');
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState('');

    const buscarProducto = async () => {
        try {
            const response = await axios.get(`http://localhost:4002/productos/${id}`);
            setProducto(response.data);
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            setError('Producto no encontrado');
        }
    };

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4002/productos/editProducto`, producto);
            alert('Producto modificado correctamente');
            onUpdate();
        } catch (error) {
            console.error('Error al modificar el producto:', error);
            alert('Error al modificar el producto');
        }
    };

    return (
        <div>
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID del Producto" />
            <button onClick={buscarProducto}>Buscar Producto</button>
            {error && <p>{error}</p>}
            {producto && (
                <form onSubmit={handleSubmit}>
                    <input name="Nombre" value={producto.Nombre} onChange={handleChange} placeholder="Nombre del Producto" />
                    <input name="Descripcion" value={producto.Descripcion} onChange={handleChange} placeholder="Descripción" />
                    <input name="Precio" type="number" value={producto.Precio} onChange={handleChange} placeholder="Precio" />
                    <input name="Stock" type="number" value={producto.Stock} onChange={handleChange} placeholder="Stock" />
                    <input name="Imagen" value={producto.Imagen} onChange={handleChange} placeholder="URL de la Imagen" />
                    <input name="Talle" value={producto.Talle} onChange={handleChange} placeholder="Talle del Producto" />
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );*/

/*
function EliminarProducto({ onDelete }) {
    const [id, setId] = useState('');
    const [producto, setProducto] = useState(null);

    const buscarProducto = async () => {
        try {
            const response = await axios.get(`http://localhost:4002/productos/${id}`);
            setProducto(response.data);
        } catch (error) {
            alert('Producto no encontrado');
            setProducto(null);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
            try {
                await axios.delete(`http://localhost:4002/productos/${id}`);
                alert('Producto eliminado correctamente');
                setProducto(null);
                onDelete();
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                alert('Error al eliminar el producto');
            }
        }
    };

    return (
        <div>
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID del Producto" />
            <button onClick={buscarProducto}>Buscar Producto</button>
            {producto && (
                <div>
                    <p>{producto.Nombre}</p>
                    <button onClick={handleDelete}>Eliminar Producto</button>
                </div>
            )}
        </div>
    );
}*/

function GestionProductos() {
   const[eliminar,setEliminar] = useState(false)
   const[modificar,setModificar] = useState(false)
   const[agregar,setAgregar] = useState(false)
    const[busca,setBusca]=useState("")
    const handlerModificar =()=>{
        setModificar(true);
        setAgregar(false);
        setEliminar(false);
        setBusca("m")
    }
    const handlerAgregar =()=>{
            setAgregar(true);
            setModificar(false);
            setEliminar(false);
    }
    const handlerEliminar =()=>{
            setEliminar(true);
            setModificar(false);
            setAgregar(false);
            setBusca("e")
    }

    return (
        <div>
            <h1 className="titulo">Gestión de Productos</h1>
            <button onClick={handlerAgregar}>Agregar Producto</button>
            <button onClick={handlerModificar}>Modificar Producto</button>
            <button onClick={handlerEliminar}>Eliminar Producto</button>

            { agregar && <FormularioAgregarProducto  />}
            { modificar && <FormularioBuscarProducto busca={busca} />}
            {eliminar && <FormularioBuscarProducto busca={busca}/>}
            
        </div>
    );
}

export default GestionProductos;
