import React, { useContext, useState } from 'react';
import   './estilos/LogStyles.css';
import LogIn from './LogIn';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "./Redux/UserSlice";
import MensajeDeErrorOut from './mensajes/MensajeDeErrorOut';
import { useDispatch, useSelector } from "react-redux";
const OpcionesLog = () =>{
    const [mensaje,setMensaje] = useState(false);
    const  dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const handlerClick =() =>{
        setMensaje(false)
        navigate('/LogIn')
    }
    const handlerRegistro = () =>{
        navigate('/Registro')
    }
    const handlerLogOut =()=>{
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
        </ul>
        {mensaje  && <MensajeDeErrorOut/>}
    </div>
    )

}
export default OpcionesLog;