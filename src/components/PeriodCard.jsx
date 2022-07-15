import React from "react";

const PeriodCard = ({period}) => {
    return ( 
        <div className="data">
            <span className='periodnamn'>{period.periodnamn}</span>
            <span className='start'>{period.start}</span>
            <span className='slut'>{period.slut}</span>
        </div>
    ); 
}

export default PeriodCard;
