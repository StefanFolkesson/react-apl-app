import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loadLS } from './functions';
import Login from '../pages/LoginPage';
import MainNavigation from './layout/MainNavigation';

const CreateElev = () => {
    let navigate = useNavigate()
    const [elev, setElev] = useState([]);
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const API_URL ="/APL-app/createdata.php?hash="+hash+"&loginnamn="+user+"&nyelev";

    const handleChange = (e) => {
        let localelev = [];
        localelev[e.target.id]=e.target.value;
        setElev(elev => ({
            ...elev,
            ...localelev
        }))
    }

    function checkData(arr,data) {
        let returnelement=true;
        data.forEach(element => {
            console.log(arr[element]);
            if(arr[element] == null){
                console.log("it is ffs null");
                returnelement = element;
            }
        });
        return returnelement;
    }
    const sendData = () => {
        let dataarr=["pnr","fnamn","enamn","klass","epost"];
        let answer=checkData(elev,dataarr);
        console.log(answer);
        if(answer == true){
            let str="";
            dataarr.forEach(element => {
            str+="&"+element;
            str+="="+elev[element];
            });
            console.log(API_URL+str);
            sendit(API_URL+str);
        }
        else {
            document.getElementById(answer).focus();
        }
    }
    const sendit = async (url) => { 
        const response = await fetch(`${url}`);
        const data = await response.json();
        if(data.status=="0"){
            navigate('/Elever');  
        } else if(data.status=="1") {
            navigate('/Elever',{state:{error:'Kan inte skapa elev!'}});  
        } else if(data.status=="2") {
            navigate('/Login');
        }
    }

    return ( 
        <div>
        {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
        <div className='data' >
            <label className='pnr'>Personnummer: <input value={elev['pnr']} id="pnr" onChange={(e)=>handleChange(e)}></input></label>
            <label className='fnamn'>Förnamn: <input value={elev['fnamn']} id="fnamn" onChange={(e)=>handleChange(e)}></input></label>
            <label className='enamn'>Efternamn: <input value={elev['enamn']} id="enamn" onChange={(e)=>handleChange(e)}></input></label>
            <label className='klass'>Klass: <input value={elev['klass']} id="klass" onChange={(e)=>handleChange(e)}></input></label>
            <label className='epost'>Epost: <input value={elev['epost']} id="epost" onChange={(e)=>handleChange(e)}></input></label>
            <button>Avbryt</button>
            <button onClick={() => sendData()}>Skicka</button>
        </div>
        </div>
    ); 
}

export default CreateElev;