import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ElevCard from "../components/ElevCard";

const API_URL ="/APL-app/readdata.php?hash=tt&loginnamn=stefan&elever";
function VisaEleverPage(props){
  const { state } = useLocation();
  let error="";
  if(state!=null){
    error=state.error;
  }
  let navigate = useNavigate();
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
            <div className="error">{error}</div>
            <h1 className="header"> Elevlista </h1>
            <button onClick={() => navigate("/Create", { state: { typ:'Elever'} })}>Ny Elev</button>
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

export default VisaEleverPage;