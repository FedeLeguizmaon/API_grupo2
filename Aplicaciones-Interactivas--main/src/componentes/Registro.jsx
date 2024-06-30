import React, { useContext, useState,useEffect } from "react";
import   './estilos/LogStyles.css';
import { useDispatch } from "react-redux";
import { addUser } from "./Redux/UserSlice";
const Registro = () =>{
    const  dispatch = useDispatch();
    useEffect(() =>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => dispatch(addUser({ Mail: data[0].email, Contraseña: 'defaultPassword' })))
        .catch((error) =>console.log(error));
    },[dispatch]);      
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handlerRegistro = (e) => {
        e.preventDefault();
        fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dispatch(addUser({ Mail: email, Contraseña: password }));
                } else {
                    console.log("Error registering user: ", data.message);
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
            <button className="BotonDeInicio" type="submit">Registrarse</button>
        </div>
        <footer className='footer'>
            <p>© 2024 Tienda de Remeras. Todos los derechos reservados.</p>
        </footer>
        </>
       
    )
}
export default Registro;
