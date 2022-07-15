import React from "react";
import { useNavigate } from "react-router-dom";

const CreateElev = ({elev}) => {

    return ( 
        <div className='data' >
            <span className='pnr'>{elev.pnr}</span>
            <span className='fnamn'>{elev.fnamn}</span>
            <span className='enamn'>{elev.enamn}</span>
            <span className='klass'>{elev.klass}</span>
            <span className='epost'>{elev.epost}</span>
            <span><button onClick={() => navigate("/EditElev", { state: { elev: elev, originElev: originElev} })}>edit</button></span>
            <span><button onClick={() => navigate("/Delete", { state: { id: elev.pnr, typ: 'Elever'} })}>delete</button></span>
        </div>
    ); 
}

export default CreateElev;