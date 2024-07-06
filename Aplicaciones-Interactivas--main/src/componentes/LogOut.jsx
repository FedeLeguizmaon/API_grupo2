import React
, { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
 const LogOut = () =>{
    
    const navigate = useNavigate();
    const HandlerReturn=()=>{
        navigate("/")
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 15000); 

        return () => clearTimeout(timer); 
    }, [navigate]);
    return(
        <><h1>Sesion cerrada correctamente</h1>
        <button onClick ={HandlerReturn}>Regresar al inicio</button>
        </>
        
        
    )
 }
 export default LogOut;