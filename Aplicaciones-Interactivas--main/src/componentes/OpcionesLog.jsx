import React, { useContext, useState } from 'react';
import   './estilos/LogStyles.css';
import LogIn from './LogIn';
import { useNavigate } from 'react-router-dom';
const OpcionesLog = () =>{
    const navigate = useNavigate();
    const handlerClick =() =>{

        navigate('/LogIn')
    }
    const handlerRegistro = () =>{
        navigate('/Registro')
    }
    return(
    <div>
        <ul className='OpcionesLog'>
            <li className='Opcion' onClick={handlerClick}>Iniciar Sesion</li>
            <li className='Opcion' onClick={handlerClick}>Cerrar Sesion</li>
        </ul>
    </div>
    )

}
export default OpcionesLog;