import React, { useState } from 'react';
import { checkData } from './functions';
import { useNavigate } from "react-router-dom";

const CreateForetag = () => {
    let navigate = useNavigate();
    let dataarr=["foretagsnamn","kontaktnummer","epost"];
    const [ftg, setFtg] = useState([]);


    const handleChange = (e) => {
        let localftg = [];
        localftg[e.target.id]=e.target.value;
        setFtg(ftg => ({
            ...ftg,
            ...localftg
        })) 
    }
    const sendit = async (url,returnAddr,errorMsg) => { 
        const response = await fetch(`${url}`);
        const data = await response.json();
        if(data.status=="0"){
            navigate(returnAddr);  
        } else if(data.status=="1") {
            navigate(returnAddr,{ state: { error: errorMsg} });  
        } else if(data.status=="2") {
            navigate('/Login');
        }
    }
    const sendData = () => {
        let answer=checkData(ftg,dataarr);
        if(answer == true){
            const API_URL ="/APL-app/createdata.php?hash=tt&loginnamn=stefan&nyttforetag";
            let str="";
            dataarr.forEach(element => {
                str+="&"+element;
                str+="="+ftg[element];
                
            });
            sendit(API_URL+str,'/Foretag','Cant create!');
        }
        else {
            document.getElementById(answer).focus()
        }
    }
        
    return ( 
        <div className='data' >
        {dataarr.map((key) => (
            <div className="data">
            <label>
              {key}: 
              <input type="text" value={ftg[key]} id={key} onChange={(e)=>handleChange(e)} />
            </label>
            
          </div>
        ))}   
            <button>Avbryt</button>
            <button onClick={() => sendData()}>Skicka</button>
        </div>
    ); 
}

export default CreateForetag;