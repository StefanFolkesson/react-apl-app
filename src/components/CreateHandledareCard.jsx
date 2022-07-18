import React, { useState } from 'react';
import { checkData } from './functions';
import { useNavigate } from "react-router-dom";

const CreateHandledare = () => {
    let navigate = useNavigate();
    let dataarr=['anvnamn','losenord','fnamn','enamn','foretagid'];
    const [handledare, setHandledare] = useState([]);


    const handleChange = (e) => {
        let localhandledare = [];
        localhandledare[e.target.id]=e.target.value;
        setHandledare(localhandledare => ({
            ...handledare,
            ...localhandledare
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
        let answer=checkData(handledare,dataarr);
        if(answer == true){
            const API_URL ="/APL-app/createdata.php?hash=tt&loginnamn=stefan&nyhandledare";
            let str="";
            dataarr.forEach(element => {
                str+="&"+element;
                str+="="+handledare[element];
                
            });
            console.log(str);
            sendit(API_URL+str,'/Handledare','Cant create!');
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
              <input type="text" value={handledare[key]} id={key} onChange={(e)=>handleChange(e)} />
            </label>
            
          </div>
        ))}   
            <button>Avbryt</button>
            <button onClick={() => sendData()}>Skicka</button>
        </div>
    ); 
}

export default CreateHandledare;