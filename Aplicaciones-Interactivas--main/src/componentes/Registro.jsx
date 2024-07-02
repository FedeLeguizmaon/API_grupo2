import React, { useContext, useState,useEffect } from "react";
import   './estilos/LogStyles.css';
import { useDispatch,useSelector } from "react-redux";
import { addUser } from "./Redux/UserSlice";
import MensajeDeRegistro from "./MensajeDeRegistro";
const Registro = () =>{
    const [mensaje,setMensaje] = useState(false)
    const  dispatch = useDispatch();
    const [role, setRol] = useState("");
    const [firstname, setNombre] = useState("");
    const [lastname, setapellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    const handlerRegistro = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:4002/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password,firstname,lastname,role }),
            
        })
        
            .then((response) => 
                
                response.json()
        )
            .then((data) => {

                console.log("Server response:", data);
                
                if (data.message) {
                    setMensaje(data.message);
                    console.log("Error registering user: ", data.message);
                } else {
                    console.log("hasta aca ok");
                    dispatch(addUser({ Mail: email, Contraseña: password, Nombre: firstname, Apellido: lastname, Rol: role }));
                }
            
                
            })
            .catch((error) => console.log("Error:", error));
    };
    return(
        <><h1 className='titulo' >Camisetas Originals</h1> 
         <div className="Registrar">
            
            <h3>Crea una cuenta:</h3>
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
           
            <div className="Input">
            <label className="etiqueta">nombre</label>
            <input
                            type="nombre"
                            placeholder="Ingrese su nombre"
                            value={firstname}
                            onChange={(e) => setNombre(e.target.value)}
                        />
            </div>
            <div className="Input">
            <label className="etiqueta">apellido</label>
            <input
                            type="apellido"
                            placeholder="Ingrese su apellido"
                            value={lastname}
                            onChange={(e) => setapellido(e.target.value)}
                        />
            </div>
            <div className="Input">
            <label className="etiqueta">rol</label>
            <input
                            type="rol"
                            placeholder="Ingrese su rol"
                            value={role}
                            onChange={(e) => setRol(e.target.value)}
                        />
            </div>
            <button  onClick= {handlerRegistro} className="BotonDeInicio" type="submit">Registrarse</button>
            {mensaje && <MensajeDeRegistro props={mensaje} />}
        </div>
        <footer className='footer'>
            <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
        </footer>
        </>
       
    )
    
}
export default Registro;
