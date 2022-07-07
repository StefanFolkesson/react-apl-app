import React from "react";

const ElevCard = ({elev}) => {
    return ( 
        <div>
            <span className='pnr'>{elev.pnr}</span>
            <span className='fnamn'>{elev.fnamn}</span>
            <span className='enamn'>{elev.enamn}</span>
            <span className='klass'>{elev.klass}</span>
            <span className='epost'>{elev.epost}</span>
        </div>
    ); 
}

export default ElevCard;
