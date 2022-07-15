import React from "react";

const ForetagCard = ({foretag}) => {
    return ( 
        <div className="data">
            <span className='foretagsnamn'>{foretag.foretagsnamn}</span>
            <span className='kontaktnummer'>{foretag.kontaktnummer}</span>
            <span className='epost'>{foretag.epost}</span>
        </div>
    ); 
}

export default ForetagCard;
