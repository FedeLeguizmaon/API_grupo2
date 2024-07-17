import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from './Redux/UserSlice';
import MensajeDeInicio from "./mensajes/MensajeDeInicio";
import MensajeDeContaInc from "./mensajes/MensajeDeContaInc";

const LogIn = () => {
    const HandlerReturn = () => {
        navigate("/");
    }
    const navigate = useNavigate();
    const handlerRegistro = () =>{
        navigate('/Registro')
    }
    const [boton, setBoton] = useState(true);
    const [credError, setCredError] = useState(false)
    const [inicio, setInicio] = useState(false)
    const dispatch = useDispatch();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:4002/api/v1/auth/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            console.log(response)
            //ACA HACER FETCH PARA MANEJAR BIEN EL LOGIN
            if (response.ok) {
                console.log("funco")
                const { access_token } = data;
                console.log(data)
                dispatch(loginUser({ Mail: email, Contraseña: password, Token: access_token, Rol: data.role,Id:data.id }));
                setInicio(true)
                setCredError(false)
                setBoton(false)
            } else {
                console.log(" no funco")
                console.error("Error logging in:", data.message);
                setCredError(true);
                setInicio(false)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    
    
    return(
        <> 
        <h1 className='titulo' >Camisetas Originals</h1> 
        {boton && <div className="Input">
                <label className="etiqueta">Correo Electronico:</label>
                <input
                            type="email"
                            placeholder="Ingrese su correo electronico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
            
            </div>}
           {boton && <div className="Input">
                <label className="etiqueta">Contraseña</label>
                <input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
            </div>}
            {boton && <button className="BotonDeRegistro" onClick={handlerRegistro} title="Si no tiene cuenta creada, registrese" >Registrarse</button>}
            {boton && <button className="BotonDeInicio"  type="submit" onClick={handleLogin}>Iniciar sesion</button>}
            
    { inicio && <MensajeDeInicio/>}
    {credError&&<MensajeDeContaInc/>}
    {!boton && <button onClick ={HandlerReturn}>Regresar al inicio</button>}
    
    
    <footer className='footer'>
            <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
        </footer>
    </>
       
    )

}
export default LogIn;