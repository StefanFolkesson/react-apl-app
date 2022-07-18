import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const EditHandledare = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const handledare = state.handledare;
    const handledareOrigin = state.handledareOrigin;
    const [handledareChanged, setHandledareChanged ] = useState([handledare]);
    const handleChange = (e) => {
        handledare[e.target.id]=e.target.value;
        setHandledareChanged(handledareChanged => ({
           ...handledareChanged,
           ...handledare
         }));
    }
    const sendData = () => {
        // I xxxchanged har vi ändringar i xxxOrigin har vi orginal.
        const API_URL ="/APL-app/editdata.php?hash=tt&loginnamn=stefan&edithandledare&originanv="+handledareOrigin.anvandarnamn;
        let str="";
        for (const key in handledareChanged) {
            if(key!=0){
              str+="&"+key;
              str+="="+handledareChanged[key];
            }
        }
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


    return        (
         <div className="listVy w100">
    <h1 className="header"> EditElev </h1>
    {Object.keys(handledare).map((key,index) => (
      <div className="data">
        <label>
          {key}:{handledareOrigin[key]}
          <input type="text" value={handledare[key]} id={key} onChange={(e)=>handleChange(e)} />
        </label>
      </div>
    ))}
    <button>Avbryt</button>
    <button onClick={() => sendData()}>Ändra</button>

  </div>
  )
    }

export default EditHandledare;
