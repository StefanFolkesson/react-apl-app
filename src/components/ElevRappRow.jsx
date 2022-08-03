import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePresens from "./CreatePresensCard";
import { loadLS } from "./functions";

const ElevRappRow = ({elev}) => {

    let admin = loadLS('admin');
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    let navigate = useNavigate();
    const originElev = JSON.parse(JSON.stringify(elev));

    return ( 
        <div className='data' >
            <span className='pnr'>{elev.pnr}</span>
            {elev.dag && <span className='dag'>{elev.dag}</span>}
            <span className='fnamn'>{elev.fnamn}</span>
            <span className='enamn'>{elev.enamn}</span>
            <span className='status'>{elev.status}</span>
            {elev.foretagsnamn && <span className='foretag'>{elev.foretagsnamn}</span>}
            {admin!=1 && (<span>
            {elev.status=="Ej registrerad"?( 
                <span>           
            <span><button onClick={() => navigate("/CreatePresens", { state: { elev:elev,presens:1} })}>Närvarande</button></span>
            <span><button onClick={() => navigate("/CreatePresens", { state: { elev:elev,presens:2} })}>Sjuk</button></span>
            <span><button onClick={() => navigate("/CreatePresens", { state: { elev:elev,presens:3} })}>Annan orsak</button></span>
            </span>
            ):(            
                <span onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>           
                <span><button onClick={() => navigate("/EditPresens", { state: { elev:elev } })}>Uppdatera</button></span>
                {isHovering && <span className="hidden" >
                <span><button onClick={() => navigate("/EditPresens", { state: { elev:elev,presens:1} })}>Närvarande</button></span>
                <span><button onClick={() => navigate("/EditPresens", { state: { elev:elev,presens:2} })}>Sjuk</button></span>
                <span><button onClick={() => navigate("/EditPresens", { state: { elev:elev,presens:3} })}>Annan orsak</button></span>
                </span>}
            </span>
            )}</span>)}
        </div>
    ); 
}

export default ElevRappRow;