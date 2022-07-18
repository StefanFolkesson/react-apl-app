import React, { useState } from 'react';
import { checkData } from './functions';
import { useNavigate } from "react-router-dom";

const CreatePeriod = () => {
    let navigate = useNavigate();
    let dataarr=['periodnamn','start','slut'];
    const [period, setPeriod] = useState([]);


    const handleChange = (e) => {
        let localperiod = [];
        localperiod[e.target.id]=e.target.value;
        setPeriod(period => ({
            ...period,
            ...localperiod
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
        let answer=checkData(period,dataarr);
        if(answer == true){
            const API_URL ="/APL-app/createdata.php?hash=tt&loginnamn=stefan&nyperiod";
            let str="";
            dataarr.forEach(element => {
                str+="&"+element;
                str+="="+period[element];
                
            });
            console.log(str);
            sendit(API_URL+str,'/Perioder','Cant create!');
        }
        else {
            document.getElementById(answer).focus()
        }
    }
        
    return ( 
        <div className='data' >
       
            <div className="data">
            <label>
            periodnamn: 
              <input type="text" value={period['periodnamn']} id='periodnamn' onChange={(e)=>handleChange(e)} />  </label></div>
              <div className="data">
            <label>
            start:  <input type="date" value={period['start']} id='start' onChange={(e)=>handleChange(e)} />  </label></div>
            <div className="data">
            <label>
            slut: <input type="date" value={period['slut']} id='slut' onChange={(e)=>handleChange(e)} />  </label></div>
          
            <button>Avbryt</button>
            <button onClick={() => sendData()}>Skicka</button>
        </div>
    ); 
}

export default CreatePeriod;
