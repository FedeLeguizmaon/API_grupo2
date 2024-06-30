import { useSelector } from "react-redux";
const Header= ()=>{
const user = useSelector((state) => state.user)
    return(
        <>
        <ul>
            <li>usuario: {user.Mail}</li>
            <li>Contraseña:{user.Contraseña}</li>
        </ul>
        </>
    )
}
