import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PeriodCard from "../components/PeriodCard";

const API_URL ="/APL-app/readdata.php?hash=tt&loginnamn=stefan&perioder";

function VisaPerioderPage(){
  const { state } = useLocation();
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

    )
}

export default VisaPerioderPage;