import { useEffect, useState } from "react";
import ElevCard from "../components/ElevCard";

const API_URL ="/APL-app/readdata.php?hash=tt&anvnamn=stefan&elever";
function EleverPage(props){
    const [elever, setElever ] = useState([]);
    const sM = async () => { 
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setElever(data.data);
    }
    useEffect(() => {
      sM();
    },[]);

    return (
        <div className="listVy w100">
            <h1 className="header"> Elevlista </h1>
            <button onClick={() => navigate("/Create", { state: { typ:Elever} })}>Ny Elev</button>
    {
      elever?.length > 0
      ? (
        <div className='data'>
          {elever.map((elev) => (
            <ElevCard elev={elev}/>
          ))}
      </div>
  
      ) : (
        <div><h2>no movies</h2></div>
      )
    }
    </div>

    )
}

export default EleverPage;