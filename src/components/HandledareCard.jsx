import React from "react";
import { useNavigate } from "react-router-dom";

const HandledareCard = ({handledare}) => {
    let navigate= useNavigate();
    const handledareOrigin = JSON.parse(JSON.stringify(handledare));

    return ( 
        <div className="data">
            <span className='id'>{handledare.id}</span>
            <span className='admin'>{handledare.admin}</span>
            <span className='anvnamn'>{handledare.anvnamn}</span>
            <span className='losenord'>{handledare.losenord}</span>
            <span className='fnamn'>{handledare.fnamn}</span>
            <span className='enamn'>{handledare.enamn}</span>
            <span className='foretagid'>{handledare.foretagid}</span>
            <span className='hash'>{handledare.hash}</span>
            <span className='expire'>{handledare.expire}</span>
            <span><button onClick={() => navigate("/EditHandledare", { state: { handledare: handledare, handledareOrigin: handledareOrigin} })}>edit</button></span>
            <span><button onClick={() => navigate("/Delete", { state: { id: handledare.anvnamn, typ: 'Handledare'} })}>delete</button></span>
        </div>
    ); 
}

export default HandledareCard;
