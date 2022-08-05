import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ElevCard from "../components/ElevCard";
import ElevRappRow from "../components/ElevRappRow";
import { loadLS } from "../components/functions";
import MainNavigation from "../components/layout/MainNavigation";
import Login from "./LoginPage";

function VisaElevTotal(props){
  const { state } = useLocation();
  const elevload = state.elev;
  console.log(elevload.personnummer);
  const [user,setUser] = useState(loadLS('user'));
  const [hash,setHash] = useState(loadLS('hash'));
  const API_URL ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&elev="+elevload.personnummer+"&period="+elevload.period;
  let error="";
  if(state!=null){
    error=state.error;
  }
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
<div>
  {user==="null"||user===""||user==="undefined"?<Login />:<MainNavigation />}
  <div className="listVy w100">
    <div className="error">{error}</div>
    { elever?.length > 0
        ? (
          <div className='data'>
            {elever.map((elev) => (
              <ElevRappRow elev={elev}/>
            ))}
        </div>
    
        ) : (
          <div><h2>Allt rapporterat</h2></div>
        )}
  </div>
  </div>
)
        }

export default VisaElevTotal;


