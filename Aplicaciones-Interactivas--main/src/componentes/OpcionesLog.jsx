import React, { useContext, useState } from 'react';
import   './estilos/LogStyles.css';
import LogIn from './LogIn';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "./Redux/UserSlice";

import { useDispatch, useSelector } from "react-redux";
import MensajeDeErrorIn from './mensajes/MensajeDeErrorIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MensajeDeErrorOut from './mensajes/MensajeDeErrorOut';
const OpcionesLog = () =>{
    const [verMas, setVerMas] = useState(false);
    const [error,setError] = useState(false)
    const [mensaje,setMensaje] = useState(false);
    const  dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const HandlerVerMas=()=>{
        navigate("/MasOpciones")
    }
    const handlerClick =() =>{
        {setMensaje(false)
        if (user.Mail){
        setError(true)
    }else
        navigate('/LogIn')}
        
    }
    const handlerHistorial = () =>{
        navigate('/historial')
    }
    const handlerLogOut =()=>{
        setError(false)
        if (user.Mail) {
            dispatch(logoutUser());
            navigate('/LogOut');}
        else{
            setMensaje(true)
            
            
        }}
    
    
    return(
    <div>
        <ul className='OpcionesLog'>
            <li className='Opcion' onClick={handlerClick}>Iniciar Sesion</li>
            <li className='Opcion' onClick={handlerLogOut}>Cerrar Sesion</li>
            <li className='Opcion' 
                    onMouseEnter={() => setVerMas(true)} 
                    onMouseLeave={() => setVerMas(false)}
                >
                    <FontAwesomeIcon icon={faPlus} title="Ver más opciones" />
                    {verMas && (
                        <ul className='SubOpciones'>
                            <li className='Opcion' onClick={HandlerVerMas}>Editar Usuario</li>
                            <li className='Opcion'onClick={handlerHistorial}>Ver Historial de pedidos</li>
                            
                        </ul>
                    )}
                </li>
        </ul>
        {mensaje  && <MensajeDeErrorOut/>}
        {error && <MensajeDeErrorIn/>}
    </div>
    )

}
export default OpcionesLog;