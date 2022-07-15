import React from "react";
import { useNavigate } from "react-router-dom";

const CreatePeriod = () => {

    // Fel kod!!!
    let navigate = useNavigate();
    return ( 
        <div className='data' >
            <span className='pnr'>+</span>
            <span className='fnamn'>dfs</span>
            <span className='enamn'>asd</span>
            <span className='klass'>ad</span>
            <span className='epost'>asd</span>
        </div>
    ); 
}
export default CreatePeriod;