import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadLS } from "./functions";
import Login from '../pages/LoginPage';
import MainNavigation from './layout/MainNavigation';

function EditElevCard(){
  let navigate = useNavigate();
  const { state } = useLocation();
  const elev = state.elev;
  const originElev = state.originElev;
  const [elevChanged, setElevChanged ] = useState([elev]);
  const [user,setUser] = useState(loadLS('user'));
  const [hash,setHash] = useState(loadLS('hash'));
  const API_URL ="/APL-app/editdata.php?hash="+hash+"&loginnamn="+user+"&editelev&originpnr="+originElev.pnr;

  const handleChange = (e) => {
    elev[e.target.id]=e.target.value;
    setElevChanged(elevChanged => ({
         ...elevChanged,
         ...elev
       }));
     }

  const sendData = () => {
    // I eelevchanged har vi ändringar i originElev har vi orginal.
    let str="";
    for (const key in elevChanged) {
        if(key!=0){
          str+="&"+key;
          str+="="+elevChanged[key];
        }
    }
    console.log(API_URL+str);
    sendit(API_URL+str);
}
    const sendit = async (url) => { 
      const response = await fetch(`${url}`);
      const data = await response.json();
      if(data.status=="0"){
        navigate('/Elever');
      } else if(data.status=="1") {
        navigate('/Elever',{status:{error:'Kan inte uppdatera elev!'}});
      } else if(data.status=="2") {
        navigate('/Login');
      }
    }
 
    return (
      <div>
      {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
        <div className="listVy w100">
          <h1 className="header"> EditElev </h1>
          {Object.keys(elev).map((key,index) => (
            <div className="data">
              <label>
                {key}:{originElev[key]}
                {key!='pnr'&&<input type="text" value={elev[key]} id={key} onChange={(e)=>handleChange(e)} />}
              </label>
              
            </div>
          ))}
          <button>Avbryt</button>
          <button onClick={() => sendData()}>Ändra</button>

        </div></div>)}

export default EditElevCard;