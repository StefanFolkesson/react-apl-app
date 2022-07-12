import React from "react";

const PeriodCard = ({peroid}) => {
    return ( 
        <div>
            <span className='periodnamn'>{peroid.periodnamn}</span>
            <span className='start'>{peroid.start}</span>
            <span className='slut'>{peroid.slut}</span>
        </div>
    ); 
}

export default PeriodCard;
