import React, { useState } from 'react';
import FormularioAgregarProducto from "./FormularioAgregarProducto";
import FormularioBuscarProducto from './FormularioBuscarProducto';

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
