import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const LogIn = () => {
const navigate = useNavigate();
const handlerRegistro = () =>{
    navigate('/Registro')
}
    return(
        <> 
        <h1 className='titulo' >Camisetas Originals</h1> 
        <div className="Login">
        <h3>Inicie Sesion</h3>
        <div className="Input">
            <label className="etiqueta">Usuario:</label>
            <input type="text" id="username" name="username" />
        
        </div>
        <div className="Input">
        <label className="etiqueta">Contraseña</label>
        <input type="password" id="password" name="password" />
        </div>
        <button className="BotonDeRegistro" onClick={handlerRegistro} title="Si no tiene cuenta creada, registrese" >Registrarse</button>
        <button className="BotonDeInicio" >Iniciar sesion</button>
    </div>
    <footer className='footer'>
            <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
        </footer>
    </>
       
    )

}
export default LogIn;