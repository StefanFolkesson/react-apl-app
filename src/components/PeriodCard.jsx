import React from "react";
import { useNavigate } from "react-router-dom";

const PeriodCard = ({period}) => {
    let navigate= useNavigate();
    const periodOrigin = JSON.parse(JSON.stringify(period));
    return ( 
        <div className="data">
            <span className='periodnamn'>{period.periodnamn}</span>
            <span className='start'>{period.start}</span>
            <span className='slut'>{period.slut}</span>
            <span><button onClick={() => navigate("/EditPeriod", { state: { period: period, periodOrigin: periodOrigin} })}>edit</button></span>
            <span><button onClick={() => navigate("/Delete", { state: { id: period.periodnamn, typ: 'Perioder'} })}>delete</button></span>
        </div>
    ); 
}

export default PeriodCard;
