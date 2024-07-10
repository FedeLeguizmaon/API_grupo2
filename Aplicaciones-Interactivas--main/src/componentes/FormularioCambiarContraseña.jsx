import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { changeContra } from "./Redux/UserSlice";

const FormularioCambiarContraseña =()=>{
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    
    const handleChangePassword = async () => {
        try {
            console.log(user.Mail)
            const response = await fetch(`http://localhost:4002/Usuario/${user.Mail}/${newPassword}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.Token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                dispatch(changeContra(newPassword));
                setMessage("Contraseña cambiada exitosamente.");
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error al cambiar la contraseña.");
        }
    };
    return(
        <>
            <div className="Input">
                <label className="etiqueta">Nueva Contraseña:</label>
                <input
                    type="password"
                    placeholder="Ingrese su nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleChangePassword}>Cambiar Contraseña</button>
            </div>
            {message && <p>{message}</p>}
        
        </>
    )
}
export default FormularioCambiarContraseña