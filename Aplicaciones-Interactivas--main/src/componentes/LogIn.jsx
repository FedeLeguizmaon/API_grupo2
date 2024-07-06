import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from './Redux/UserSlice';
import MensajeDeInicio from "./mensajes/MensajeDeInicio";
const LogIn = () => {
const navigate = useNavigate();
const handlerRegistro = () =>{
    navigate('/Registro')
}
const [inicio,setInicio]= useState(false)
const dispatch=useDispatch();
const[email,setEmail] = useState("");
const[password,setPassword]=useState("");
const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch("http://localhost:4002/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        console.log(response)
        if (response.ok) {
            console.log("funco")
            const { access_token } = data;
            dispatch(loginUser({ Mail: email, Contraseña: password, Token: access_token }));
            setInicio(true)
        } else {
            console.log(" no funco")
            console.error("Error logging in:", data.message);
            <h1>Usuario no existe/contraseña incorrecta</h1>
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

    
    
    return(
        <> 
        <h1 className='titulo' >Camisetas Originals</h1> 
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
            <button className="BotonDeRegistro" onClick={handlerRegistro} title="Si no tiene cuenta creada, registrese" >Registrarse</button>
            <button className="BotonDeInicio"  type="submit" onClick={handleLogin}>Iniciar sesion</button>
    
    { inicio && <MensajeDeInicio/>}
    
    <footer className='footer'>
            <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
        </footer>
    </>
       
    )

}
export default LogIn;