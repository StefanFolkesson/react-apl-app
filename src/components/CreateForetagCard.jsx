import React, { useState } from 'react';
import { checkData } from './functions';
import { useNavigate } from "react-router-dom";
import { loadLS } from "./functions";
import Login from '../pages/LoginPage';
import MainNavigation from './layout/MainNavigation';

const CreateForetag = () => {
    let navigate = useNavigate();
    let dataarr=["foretagsnamn","kontaktnummer","epost"];
    const [ftg, setFtg] = useState([]);
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const API_URL ="/APL-app/createdata.php?hash="+hash+"&loginnamn="+user+"&nyttforetag";


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
        console.log(JSON.stringify(ftg));
        console.log(JSON.stringify(dataarr));
        let answer=checkData(ftg,dataarr);
        if(answer == true){
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
        <div>
        {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
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
        </div>
    ); 
}

export default CreateForetag;