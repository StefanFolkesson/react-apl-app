import React, { useState } from 'react';
import { checkData } from './functions';
import { useNavigate } from "react-router-dom";
import { loadLS } from "./functions";
import Login from '../pages/LoginPage';
import MainNavigation from './layout/MainNavigation';

const CreateHandledare = () => {
    let navigate = useNavigate();
    let dataarr=['anvnamn','losenord','fnamn','enamn','foretagid'];
    const [handledare, setHandledare] = useState([]);
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const API_URL ="/APL-app/createdata.php?hash="+hash+"&loginnamn="+user+"&nyhandledare";

    const handleChange = (e) => {
        let localhandledare = [];
        localhandledare[e.target.id]=e.target.value;
        setHandledare(handledare => ({
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
        console.log(JSON.stringify(handledare));
        console.log(JSON.stringify(dataarr));
        let answer=checkData(handledare,dataarr);
        if(answer == true){
            let str="";
            dataarr.forEach(element => {
                str+="&"+element;
                str+="="+handledare[element];
            });
            console.log(str);
            sendit(API_URL+str,'/Handledare','Kan inte skapa handledare!');
        }
        else {
            document.getElementById(answer).focus()
        }
    }
        
    return ( 
        <div>
        {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
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
        </div>
    ); 
}

export default CreateHandledare;