import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HandledareCard from "../components/HandledareCard";

const API_URL ="/APL-app/readdata.php?hash=tt&anvnamn=stefan&handledare";

function VisaHandledarePage(){
  let navigate = useNavigate();
    const [handledare, setHandledare ] = useState([]);
    const sM = async () => { 
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setHandledare(data.data);
    }
    useEffect(() => {
      sM();
    },[]);
  




    return (
        <div className="listVy w100">
                    <h1 className="header"> Handledarlista </h1>
                    <button onClick={() => navigate("/Create", { state: { typ:'Handledare'} })}>Ny handledare</button>

    {
      handledare?.length > 0
      ? (
        <div className='period'>
          {handledare.map((handled) => (
            <HandledareCard handled={handled}/>
          ))}
      </div>
  
      ) : (
        <div><h2>no handled</h2></div>
      )
    }
    </div>

    )
}

export default VisaHandledarePage;