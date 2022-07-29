import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElevCard from "./ElevCard";
import { loadLS } from "./functions";

const OplaceradeCard = () => {
    let navigate= useNavigate();
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const [pid,setPid] = useState("");
    const [pnr,setPnr] = useState("");
    const [fnamn,setFnamn] = useState("");
    const [enamn,setEnamn] = useState("");
    const [elever,setElever] = useState([]);
    const [showElever,setShowElever] = useState([]);

    const API_URL ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&oplacerade";
    const sendData = () => {
        sendit(API_URL);
    }
    const sendit = async (url) => { 
        const response = await fetch(`${url}`);
        const data = await response.json();

        if(data.status=="0"){
            setElever(data.data);
        } else if(data.status=="1") {
            navigate('/',{state: { error: 'Något är fel på placeringarna'} })
        } else if(data.status=="2") {
        navigate('/Login');
        }
    }
    useEffect(() => {
        sendData();
        },[]);
    useEffect(()=>{
        setShowElever(elever.filter(elevFilter));
    },[pnr,fnamn,enamn,elever]);

    function elevFilter(elev){
        if( elev.pnr.includes(pnr)
        && elev.fnamn.includes(fnamn)
        && elev.enamn.includes(enamn)
        )
        return true;
        else 
        return false;
    }

    const handleChangePnr = (e) => {
        setPnr(e.target.value);
    }
    const handleChangeFnamn = (e) => {
        setFnamn(e.target.value);
    }
    const handleChangeEnamn = (e) => {
        setEnamn(e.target.value);
    }
    const clearFilter = (e) => {
        setEnamn("");
        setFnamn("");
        setPnr("");
    }
    const placera = (pnr) => {
        setEnamn("");
        setFnamn("");
        setPnr("");
    }
    return ( 
        <div>
                          <div className='data'>
                <table>
                <tr>
                                <td className='pnr'><input type='text' value={pnr} onChange={(e)=>handleChangePnr(e)}></input></td>
                                <td className='fnamn'><input type='text' value={fnamn} onChange={(e)=>handleChangeFnamn(e)}></input></td>
                                <td  className='enamn'><input type='text' value={enamn} onChange={(e)=>handleChangeEnamn(e)}></input></td>
                                {(pnr!=""||fnamn!=""||enamn!="")&&<td><input type='button' value="Rensa filter" onClick={(e)=>clearFilter()}></input></td>}
                                </tr>
            {
            showElever?.length > 0 && showElever.map((elev) => (     <tr>
                                <td className='pnr'>{elev.pnr}</td>
                                <td className='fnamn'>{elev.fnamn}</td>
                                <td  className='enamn'>{elev.enamn}</td>
                                <td> <input type='button' value='placera' onClick={(e)=>placera(elev.pnr)} ></input></td>
                                </tr>
                ))}
            </table>
            </div>
          </div>   ); 
}

export default OplaceradeCard;
