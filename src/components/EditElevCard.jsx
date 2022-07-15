import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function EditElevCard(){
  let navigate = useNavigate();
  const { state } = useLocation();
  const elev = state.elev;
  const originElev = state.originElev;
  const [elevChanged, setElevChanged ] = useState([elev]);
  const handleChange = (e) => {
    elev[e.target.id]=e.target.value;
    setElevChanged(elevChanged => ({
         ...elevChanged,
         ...elev
       }));
     }

  const sendData = () => {
    // I eelevchanged har vi ändringar i originElev har vi orginal.
    const API_URL ="/APL-app/editdata.php?hash=tt&anvnamn=stefan&editelev&originpnr="+originElev.pnr;
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
        // skall poppa upp ett felmeddelande. och stanna kvar... 
      } else if(data.status=="2") {
        navigate('/Login');
      }
    }

 
    return (
        <div className="listVy w100">
          <h1 className="header"> EditElev </h1>
          {Object.keys(elev).map((key,index) => (
            <div className="data">
              <label>
                {key}:{originElev[key]}
                <input type="text" value={elev[key]} id={key} onChange={(e)=>handleChange(e)} />
              </label>
              
            </div>
          ))}
          <button>Avbryt</button>
          <button onClick={() => sendData()}>Ändra</button>

        </div>)}

export default EditElevCard;