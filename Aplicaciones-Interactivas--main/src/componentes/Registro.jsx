import React, { useContext, useState } from "react";
import   './estilos/LogStyles.css';
const Registro = () =>{
    return(
        <><h1 className='titulo' >Camisetas Originals</h1> 
         <div className="Registrar">
            
            <h3>Crea una cuenta:</h3>
            <div className="Input">
                <label className="etiqueta">Correo Electronico:</label>
                <input type="text" id="username" name="username" />
            
            </div>
            <div className="Input">
            <label className="etiqueta">Contraseña</label>
            <input type="password" id="password" name="password" />
            </div>
            <button className="BotonDeInicio" >Registrarse</button>
        </div>
        <footer className='footer'>
            <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
        </footer>
        </>
       
    )
}
export default Registro;
