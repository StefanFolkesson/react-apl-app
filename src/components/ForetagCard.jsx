import React from "react";
import { useNavigate } from "react-router-dom";

const ForetagCard = ({foretag}) => {
    let navigate= useNavigate();
    const foretagOrigin = JSON.parse(JSON.stringify(foretag));
    return ( 
        <div className="data">
            <span className='foretagsnamn'>{foretag.foretagsnamn}</span>
            <span className='kontaktnummer'>{foretag.kontaktnummer}</span>
            <span className='epost'>{foretag.epost}</span>
            <span><button onClick={() => navigate("/EditForetag", { state: { foretag: foretag, foretagOrigin: foretagOrigin} })}>edit</button></span>
            <span><button onClick={() => navigate("/Delete", { state: { id: foretag.foretagsnamn, typ: 'Foretag'} })}>delete</button></span>
        </div>
    ); 
}

export default ForetagCard;
