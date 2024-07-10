
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MensajeDeContaInc from "./mensajes/MensajeDeContaInc";
import EligeQueCambia from "./EligeQueCambia";

const MasOpciones =()=>{
    const[email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const [message, setMessage] = useState(false);
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
        else if(user.Mail === email && user.Contraseña === password){
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