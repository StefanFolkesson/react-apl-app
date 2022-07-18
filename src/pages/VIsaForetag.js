import { useEffect,  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ForetagCard from "../components/ForetagCard";

const API_URL ="/APL-app/readdata.php?hash=tt&loginnamn=stefan&arbetsplatser";

function VisaForetagPage(){
  let navigate= useNavigate();
  const { state } = useLocation();
  let error="";
  if(state!=null){
    error=state.error;
  }
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
            <div className="error">{error}</div>
                  <h1 className="header"> Företagslista</h1>
                  <button onClick={() => navigate("/Create", { state: { typ:'Foretag'} })}>Nytt företag</button>
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

export default VisaForetagPage;