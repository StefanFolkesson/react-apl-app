import React from "react";
import { useNavigate } from "react-router-dom";
import VisaEleverPage from "../pages/VisaElever";

const ElevRappRow = ({elev}) => {
    let navigate = useNavigate();
    const originElev = JSON.parse(JSON.stringify(elev));

    return ( 
        <div className='data' >
            <span className='pnr'>{elev.pnr}</span>
            {elev.dag && <span className='dag'>{elev.dag}</span>}
            <span className='fnamn'>{elev.fnamn}</span>
            <span className='enamn'>{elev.enamn}</span>
            <span className='status'>{elev.status}</span>
            {elev.status=="Ej registrerad"?(            
            <span><button onClick={() => navigate("/CreatePresens", { state: { elev: elev } })}>Registrera</button></span>
            ):(            
            <span><button onClick={() => navigate("/UpdatePresens", { state: { elev:elev } })}>Uppdatera</button></span>
            )}
        </div>
    ); 
}

export default ElevRappRow;