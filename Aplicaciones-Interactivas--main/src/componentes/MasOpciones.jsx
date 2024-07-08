
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { loginUser } from './Redux/UserSlice';
import MensajeDeInicio from "./mensajes/MensajeDeInicio";
import MensajeDeContaInc from "./mensajes/MensajeDeContaInc";
import { changeMail,changeContra } from "./Redux/UserSlice";
import FormularioCambiar from "./FormularioCambiarContraseña";
import EligeQueCambia from "./EligeQueCambia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import FormularioCambiarContraseña from "./FormularioCambiarContraseña";
const MasOpciones =()=>{
    const navigate = useNavigate()
    const[email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [formulario,setFormulario]=useState(false)
    const handlerAtras=()=>{
        setFormulario(false)
    }
    const Verificar=()=>{
        if (email.trim() === '' || password.trim() === '') {
            // Validar campos vacíos
            setMessage(true);
            setFormulario(false);}
        else if(user.Mail == email && user.Contraseña == password){
            setFormulario(true)
            setMessage(false);
        }
        else{
            setMessage(true)
            setFormulario(false);
        }
    }
   
    return(
        <>
        <h1 className='titulo' >Camisetas Originals</h1> 
        <h3>Ingrese su usuario y contraseña nuevamente</h3>
        <div className="Input">
                <label className="etiqueta">Correo Electronico:</label>
                <input
                            type="email"
                            placeholder="Ingrese su correo electronico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
            
            </div>
            <div className="Input">
                <label className="etiqueta">Contraseña</label>
                <input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
            </div>
            <button type="submit" onClick={Verificar}>Verificar</button>
            <button onClick={handlerAtras}>Cancelar</button>
            
            {message && <MensajeDeContaInc/> }
            {formulario && <EligeQueCambia  formulario={formulario} setFormulario={setFormulario}/> }
            
        </>
        
        
    )
}


export default MasOpciones;