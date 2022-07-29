import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadLS } from "./functions";
import Login from '../pages/LoginPage';
import MainNavigation from './layout/MainNavigation';


const EditForetag = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const foretag = state.foretag;
    const foretagOrigin = state.foretagOrigin;
    const [foretagChanged, setForetagChanged ] = useState([foretag]);
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const API_URL ="/APL-app/editdata.php?hash="+hash+"&loginnamn="+user+"&editforetag&foretagsnamn="+foretagOrigin.foretagsnamn;
  
    const handleChange = (e) => {
      foretag[e.target.id]=e.target.value;
      setForetagChanged(foretagChanged => ({
           ...foretagChanged,
           ...foretag
         }));
    }
    const sendData = () => {
        // I xxxchanged har vi ändringar i xxxOrigin har vi orginal.
        let str="";
        for (const key in foretagChanged) {
            if(key!=0){
              str+="&"+key;
              str+="="+foretagChanged[key];
            }
        }
        sendit(API_URL+str);
    }
    const sendit = async (url) => { 
        const response = await fetch(`${url}`);
        const data = await response.json();
        if(data.status=="0"){
          navigate('/Foretag');
        } else if(data.status=="1") {
            navigate('/Foretag',{state: { error: 'Cant edit foretag'} });
        } else if(data.status=="2") {
          navigate('/Login');
        }
      }


    return        (
<div>
  {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
  <div className="listVy w100">
    <h1 className="header"> EditFöretag </h1>
    {Object.keys(foretag).map((key,index) => (
    <div className="data">
      <label>
      {key}:{foretagOrigin[key]}
      <input type="text" value={foretag[key]} id={key} onChange={(e)=>handleChange(e)} />
      </label>
    </div>
    ))}
    <button>Avbryt</button>
    <button onClick={() => sendData()}>Ändra</button>
  </div>
</div>
  )
}

export default EditForetag;