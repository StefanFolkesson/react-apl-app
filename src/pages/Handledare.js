import { useEffect, useState } from "react";
import HandledareCard from "../components/HandledareCard";

const API_URL ="/APL-app/readdata.php?hash=tt&anvnamn=stefan&handledare";

function HandledarePage(){
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
        <div>
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

export default HandledarePage;