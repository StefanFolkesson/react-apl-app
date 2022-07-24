import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadLS } from "../components/functions";
import PeriodCard from "../components/PeriodCard";
import MainNavigation from "../components/layout/MainNavigation";
import Login from "./LoginPage";


function VisaPerioderPage(){
  const { state } = useLocation();
  const [user,setUser] = useState(loadLS('user'));
  const [hash,setHash] = useState(loadLS('hash'));
  const API_URL ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&perioder";
  let error="";
  if(state!=null){
    error=state.error;
  }
  let navigate = useNavigate();
    const [perioder, setPerioder ] = useState([]);
    const sM = async () => { 
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setPerioder(data.data);
    }
    useEffect(() => {
      sM();
    },[]);
  
    return (
      <div>
      {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
        <div className="listVy w100">
                     <div className="error">{error}</div>
                                         <h1 className="header"> Periodlista</h1>
                    <button onClick={() => navigate("/Create", { state: { typ:'Period'} })}>Nytt Period</button>

    {
      perioder?.length > 0
      ? (
        <div className='period'>
          {perioder.map((period) => (
            <PeriodCard period={period}/>
          ))}
      </div>
  
      ) : (
        <div><h2>no peroid</h2></div>
      )
    }
    </div>
</div>
    )
}

export default VisaPerioderPage;