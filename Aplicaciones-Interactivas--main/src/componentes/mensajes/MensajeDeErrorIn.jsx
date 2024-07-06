import React, { useEffect, useState } from 'react';

const MensajeDeErrorIn =()=>{
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000); 

        return () => clearTimeout(timer);
    }, []); 
    return(
        <>
        {visible && <h4 className="MensajesOp">Ya has iniciado sesion, cierra esta sesion para iniciar otra</h4>}
        </>
    )
}
export default MensajeDeErrorIn;