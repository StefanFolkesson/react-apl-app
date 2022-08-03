import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadLS } from "./functions";
import Login from '../pages/LoginPage';
import MainNavigation from './layout/MainNavigation';


const EditHandledare = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const handledare = state.handledare;
    const handledareOrigin = state.handledareOrigin;
    const [handledareChanged, setHandledareChanged ] = useState([handledare]);
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const API_URL ="/APL-app/editdata.php?hash="+hash+"&loginnamn="+user+"&edithandledare&originanv="+handledareOrigin.anvnamn;

    const handleChange = (e) => {
        handledare[e.target.id]=e.target.value;
        setHandledareChanged(handledareChanged => ({
           ...handledareChanged,
           ...handledare
         }));
    }
    const sendData = () => {
        // I xxxchanged har vi ändringar i xxxOrigin har vi orginal.
        let str="";
        for (const key in handledareChanged) {
            if(key!=0&&key!='hash'&&key!='expire'){
              str+="&"+key;
              str+="="+handledareChanged[key];
            }
        }
        console.log(API_URL+str);
        sendit(API_URL+str);
    }
    const sendit = async (url) => { 
        const response = await fetch(`${url}`);
        const data = await response.json();
        if(data.status=="0"){
          navigate('/Handledare');
        } else if(data.status=="1") {
            navigate('/Handledare',{state: { error: 'Cant edit Handledare'} });
        } else if(data.status=="2") {
          navigate('/Login');
        }
      }
      const notedit = ['id','admin','hash','expire'];
    return        (
<div>
  {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
  <div className="listVy w100">
    <h1 className="header"> EditHandledare</h1>
    {Object.keys(handledare).map((key,index) => (
    <div className="data">
      {!notedit.includes(key) && <label>{key}:{handledareOrigin[key]}<input type="text" value={handledare[key]} id={key} onChange={(e)=>handleChange(e)} /></label>}
    </div>
    ))}
    <button>Avbryt</button>
    <button onClick={() => sendData()}>Ändra</button>
  </div>
</div>
  )
}

export default EditHandledare;
