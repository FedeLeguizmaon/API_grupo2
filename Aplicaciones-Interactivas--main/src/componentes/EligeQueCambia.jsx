import React, { useState } from "react";
import FormularioCambiarContraseña from "./FormularioCambiarContraseña";
import FormularioCambiarCorreo from "./FormularioCambiarCorreo";

const EligeQueCambia=()=>{
    const [contra,setContra]=useState(false);
    const [usuario,setUsuario]=useState(false);
    const handlerContra=()=>{
        
        
        setContra(true);
        setUsuario(false);
        }
        const handlerUsuario=()=>{
            
            
            setUsuario(true)
            setContra(false)
        }
    return(
        <>
        <h4>Elige que cambiar</h4>
        <button onClick={handlerContra}>Cambiar Contraseña</button>
        <button onClick={handlerUsuario}>Cambiar usuario</button>

        {contra && <FormularioCambiarContraseña/>}
        {usuario && <FormularioCambiarCorreo/>}
        </>
    )
}
export default EligeQueCambia;