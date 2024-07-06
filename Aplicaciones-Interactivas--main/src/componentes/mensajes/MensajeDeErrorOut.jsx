import React, { useEffect, useState } from 'react';


const MensajeDeErrorOut=()=>{
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000); 

        return () => clearTimeout(timer);
    }, []); 
    return(
    <>{visible && <h3 className="MensajesOp">Aun no has iniciado sesion</h3>} 
    </>
       
    )
}
export default MensajeDeErrorOut;