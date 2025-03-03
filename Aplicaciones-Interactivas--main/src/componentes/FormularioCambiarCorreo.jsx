import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { changeMail } from "./Redux/UserSlice";

const FormularioCambiarCorreo =()=>{
    const [newEmail, setNewEmail] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleChangeEmail = async () => {
        try {
            const response = await fetch(`http://localhost:4002/Usuario/cambiarMail`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.Token}`,
                },
                body: JSON.stringify({
                    mailAct: user.Mail,
                    mailNuevo: newEmail,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(changeMail(newEmail));
                console.log("Nuevo correo en el store:", newEmail);
                setMessage("Email cambiado exitosamente.");
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error al cambiar el email.");
        }
    };
    
    return(
        <>
         <div className="Input">
                <label className="etiqueta">Correo Electronico Nuevo:</label>
                <input
                            type="email"
                            placeholder="Correo electronico nuevo"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
            
            <button onClick={handleChangeEmail}>Cambiar Correo</button>
            </div>
            {message && <p>{message}</p>}
        </>
    )
}
export default FormularioCambiarCorreo;