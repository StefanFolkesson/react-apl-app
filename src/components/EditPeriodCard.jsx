import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadLS } from "./functions";
import Login from '../pages/LoginPage';
import MainNavigation from './layout/MainNavigation';


const EditPeriod = () => {

    let navigate = useNavigate();
    const { state } = useLocation();
    const period = state.period;
    const periodOrigin = state.periodOrigin;
    const [periodChanged, setPeriodChanged ] = useState([period]);
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const API_URL ="/APL-app/editdata.php?hash="+hash+"&loginnamn="+user+"&editperiod&periodnamn="+periodOrigin.periodnamn;
    
    const handleChange = (e) => {
        period[e.target.id]=e.target.value;
        setPeriodChanged(periodChanged => ({
           ...periodChanged,
           ...period
         }));
    }
    const sendData = () => {
        // I xxxchanged har vi ändringar i xxxOrigin har vi orginal.
        let str="";
        for (const key in periodChanged) {
            if(key!=0){
              str+="&"+key;
              str+="="+periodChanged[key];
            }
        }
        sendit(API_URL+str);
    }
    const sendit = async (url) => { 
        const response = await fetch(`${url}`);
        const data = await response.json();
        if(data.status=="0"){
          navigate('/Perioder');
        } else if(data.status=="1") {
            navigate('/Perioder',{state: { error: 'Cant edit Period'} });
        } else if(data.status=="2") {
          navigate('/Login');
        }
      }


    return        (
      <div>
      {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
    <div className="listVy w100">
        <h1 className="header"> EditPeriod </h1>
        <div className="data"><label>periodnamn:{periodOrigin['periodnamn']}</label></div>
        <div className="data"><label>start:{periodOrigin['start']}<input type="date" value={period['start']} id='start' onChange={(e)=>handleChange(e)} /></label></div>
        <div className="data"><label>slut:{periodOrigin['slut']}<input type="date" value={period['slut']} id='slut' onChange={(e)=>handleChange(e)} /></label></div>
        <button>Avbryt</button>
        <button onClick={() => sendData()}>Ändra</button>
    </div></div>
  )
    }

export default EditPeriod;