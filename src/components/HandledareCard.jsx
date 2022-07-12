import React from "react";

const HandledareCard = ({handled}) => {
    return ( 
        <div>
            <span className='id'>{handled.id}</span>
            <span className='admin'>{handled.admin}</span>
            <span className='anvnamn'>{handled.anvnamn}</span>
            <span className='losenord'>{handled.losenord}</span>
            <span className='fnamn'>{handled.fnamn}</span>
            <span className='enamn'>{handled.enamn}</span>
            <span className='foretagid'>{handled.foretagid}</span>
            <span className='hash'>{handled.hash}</span>
            <span className='expire'>{handled.expire}</span>
        </div>
    ); 
}

export default HandledareCard;
