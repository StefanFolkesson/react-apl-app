import { useEffect, useState } from "react";
import ForetagCard from "../components/ForetagCard";

const API_URL ="/APL-app/readdata.php?hash=tt&anvnamn=stefan&arbetsplatser";

function ForetagPage(){
    const [ftg, setftg ] = useState([]);
    const sM = async () => { 
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setftg(data.data);
    }
    useEffect(() => {
      sM();
    },[]);
  
    return (
      <div className="listVy w100">
                  <h1 className="header"> Företagslista</h1>
    {
      ftg?.length > 0
      ? (
        <div className='foretag'>
          {ftg.map((foretag) => (
            <ForetagCard foretag={foretag}/>
          ))}
      </div>
  
      ) : (
        <div><h2>no ftg</h2></div>
      )
    }
    </div>

    )
}

export default ForetagPage;