import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { loadLS } from './functions';


const EditPresens = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const elev = state.elev;
    const presens= state.presens;
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const API_URL ="/APL-app/editdata.php?hash="+hash+"&loginnamn="+user+"&editpresens";

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
            let str="&datum="+elev.dag+"&status="+presens+"&pid="+elev.pid;
            console.log(str);
            sendit(API_URL+str,'/','Cant Update!');
    }
    useEffect(() => {
        sendData();
      },[]);
        
    return <div>Sending Data</div>
}

export default EditPresens;
