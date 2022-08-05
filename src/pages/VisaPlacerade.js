import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadLS } from "../components/functions";

const VisaPlaceradeCard = () => {
    let navigate= useNavigate();
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const [personnummer,setPersonnummer] = useState("");
    const [period,setPeriod] = useState("");
    const [foretagsnamn,setForetagsnamn] = useState("");
    const [elever,setElever] = useState([]);
    const [showElever,setShowElever] = useState([]);
    const API_URL ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&ute";
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
    },[personnummer,period,foretagsnamn,elever]);

    function elevFilter(elev){
        if( elev.personnummer.includes(personnummer)
        && elev.period.includes(period)
        && elev.foretagsnamn.includes(foretagsnamn)
        )
        return true;
        else 
        return false;
    }

    const handleChangePnr = (e) => {
        setPersonnummer(e.target.value);
    }
    const handleChangePeriod = (e) => {
        setPeriod(e.target.value);
    }
    const handleChangeFtg = (e) => {
        setForetagsnamn(e.target.value);
    }
    const clearFilter = (e) => {
        setForetagsnamn("");
        setPeriod("");
        setPersonnummer("");
    }
    return ( 
<div>
    <div className='data'>
        <table>
            <tr>
                <td className='personnummer'><input type='text' value={personnummer} onChange={(e)=>handleChangePnr(e)}></input></td>
                <td className='period'><input type='text' value={period} onChange={(e)=>handleChangePeriod(e)}></input></td>
                <td  className='foretagsnamn'><input type='text' value={foretagsnamn} onChange={(e)=>handleChangeFtg(e)}></input></td>
                {(personnummer!=""||period!=""||foretagsnamn!="")&&<td><input type='button' value="Rensa filter" onClick={(e)=>clearFilter()}></input></td>}
            </tr>
            {showElever?.length > 0 && showElever.map((elev) => (     
            <tr>
                <td className='personnummer'>{elev.personnummer}</td>
                <td className='period'>{elev.period}</td>
                <td  className='foretagsnamn'>{elev.foretagsnamn}</td>
                <td><input type='button' value="Visa Total" onClick={(e)=>navigate("/VisaElevTotal",{state:{elev:elev}})}></input></td>
            </tr>
            ))}
        </table>
    </div>
</div>
    ); 
}

export default VisaPlaceradeCard;
