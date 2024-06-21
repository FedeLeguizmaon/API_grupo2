import React, { useState } from 'react';
import axios from 'axios';


function AgregarProducto({ onAdd }) {
    const [producto, setProducto] = useState({
        Name: '',
        Descripcion: '',
        Precio: '',
        Stock: '',
        Imagen: ''
    });

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/products', producto);
            alert('Producto agregado correctamente con ID: ' + response.data.id);
            setProducto({ Name: '', Descripcion: '', Precio: '', Stock: '', Imagen: '' }); // Limpiar formulario
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            alert('Error al agregar el producto');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="Name" value={producto.Name} onChange={handleChange} placeholder="Nombre del Producto" />
            <input name="Descripcion" value={producto.Descripcion} onChange={handleChange} placeholder="Descripción" />
            <input name="Precio" type="number" value={producto.Precio} onChange={handleChange} placeholder="Precio" />
            <input name="Stock" type="number" value={producto.Stock} onChange={handleChange} placeholder="Stock" />
            <input name="Imagen" value={producto.Imagen} onChange={handleChange} placeholder="URL de la Imagen" />
            <button type="submit">Agregar Producto</button>
        </form>
    );}

function ModificarProducto({ onUpdate }) {
    const [id, setId] = useState('');
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState('');

    const buscarProducto = async () => {
        setError('');
        try {
            const response = await axios.get(`http://localhost:3001/products/${id}`);
            setProducto(response.data);  // Carga los datos del producto en el estado
        } catch (error) {
            setError('Producto no encontrado');  // Maneja el error si el producto no existe
            setProducto(null);
        }
    };

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/products/${id}`, producto);
            alert('Producto modificado correctamente');
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
                    <input name="Name" value={producto.Name} onChange={handleChange} placeholder="Nombre del Producto" />
                    <input name="Descripcion" value={producto.Descripcion} onChange={handleChange} placeholder="Descripción" />
                    <input name="Precio" type="number" value={producto.Precio} onChange={handleChange} placeholder="Precio" />
                    <input name="Stock" type="number" value={producto.Stock} onChange={handleChange} placeholder="Stock" />
                    <input name="Imagen" value={producto.Imagen} onChange={handleChange} placeholder="URL de la Imagen" />
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );}

function EliminarProducto({ onDelete }) {
    const [id, setId] = useState('');
  const [producto, setProducto] = useState(null);

  const buscarProducto = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      setProducto(response.data);
    } catch (error) {
      alert('Producto no encontrado');
      setProducto(null);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      try {
        await axios.delete(`http://localhost:3001/products/${id}`);
        alert('Producto eliminado correctamente');
        setProducto(null);
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
          <p>{producto.Name}</p>
          <button onClick={handleDelete}>Eliminar Producto</button>
        </div>
      )}
    </div>
  );
}

function GestionProductos() {
  const [mode, setMode] = useState('');

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <button onClick={() => setMode('add')}>Agregar Producto</button>
      <button onClick={() => setMode('modify')}>Modificar Producto</button>
      <button onClick={() => setMode('delete')}>Eliminar Producto</button>

      {mode === 'add' && <AgregarProducto onAdd={AgregarProducto} />}
      {mode === 'modify' && <ModificarProducto onUpdate={ModificarProducto} />}
      {mode === 'delete' && <EliminarProducto onDelete={EliminarProducto} />}
      
    </div>
  );
}

export default GestionProductos;