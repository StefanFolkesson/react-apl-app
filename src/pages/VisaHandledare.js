import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { loadLS } from "../components/functions";
import HandledareCard from "../components/HandledareCard";
import MainNavigation from "../components/layout/MainNavigation";
import Login from "./LoginPage";


function VisaHandledarePage(){
  const { state } = useLocation();
  const [user,setUser] = useState(loadLS('user'));
  const [hash,setHash] = useState(loadLS('hash'));
  const API_URL ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&handledare";
  let error="";
  if(state!=null){
    error=state.error;
  }
  let navigate = useNavigate();
  const [handledare, setHandledare ] = useState([]);
  const startup = async () => { 
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    setHandledare(data.data);
  }
  useEffect(() => {
    startup();
  },[]);

  return (
<div>
  {user==="null"||user===""||user==="undefined"?<Login />:<MainNavigation />}
  <div className="listVy w100">
    <div className="error">{error}</div>
    <h1 className="header"> Handledarlista </h1>
    <button onClick={() => navigate("/Create", { state: { typ:'Handledare'} })}>Ny handledare</button>
    {handledare?.length > 0? (
    <div className='period'>
      {handledare.map((handled) => (<HandledareCard handledare={handled}/>))}
    </div>
    ) : (
    <div><h2>no handled</h2></div>
    )
    }
  </div>
</div>
    )
}

export default VisaHandledarePage;