import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/LoginPage";
import { loadLS } from "./functions";
import MainNavigation from "./layout/MainNavigation";

const PlaceraCard = () => {
    // H'msta alla perioder
    // Hämta alla Företag
    // Lista elev med två dropboxes. )
    const { state } = useLocation();
    const pnr = state.pnr;
    let navigate= useNavigate();
    const [user,setUser] = useState(loadLS('user'));
    const [hash,setHash] = useState(loadLS('hash'));
    const API_URL_PERIODER ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&perioder";
    const API_URL_FORETAG ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&arbetsplatser";
    const API_URL_PLACERING ="/APL-app/createdata.php?hash="+hash+"&loginnamn="+user+"&nyplacering";
    let error="";
    if(state!=null){
      error=state.error;
    }
    const [placering,setPlacering] = useState({['personnummer']:pnr});
    const [perioder, setPerioder] = useState();
    const [foretag,setForetag] = useState();
    const getPerioder = async () => { 
        const responsePeriod = await fetch(`${API_URL_PERIODER}`);
        const dataPeriod = await responsePeriod.json();
        console.log(dataPeriod.data);
        setPerioder(dataPeriod.data);
    }
    const getForetag = async () => {
        const responseFtg = await fetch(`${API_URL_FORETAG}`);
        const dataFtg = await responseFtg.json();
        console.log(dataFtg.data);
        setForetag(dataFtg.data);
    }

    useEffect(() => {
        getPerioder();
        getForetag();
    },[]);

    const sendit = async (url) => { 
        console.log(url);
        const response = await fetch(`${url}`);
        let data = await response.json();
        if(data.status=="0"){
            navigate('/Placerade');
        } else if(data.status=="1") {
            navigate('/Placerade',{state: { error: 'Något är fel på placeringarna'} });
        } else if(data.status=="2") {
        navigate('/Login');
        }
    }

    const handleChange = (e) => {
        const {name,value}=e.currentTarget;
        setPlacering(prevState =>({
            ...prevState,
            [name]:value
        }));
    }
    const handleClick = (e) => {
        let check=checkData();
        console.log(placering);
        if(check===true){
            let str="&personnummer="+placering.personnummer+"&period="+placering.period+"&foretagsnamn="+placering.foretagsnamn;
            sendit(API_URL_PLACERING+str);
        }
        else{
            document.getElementById(check).focus();
        }
    }
    function checkData() {
        let returnelement=true;
        let elementen=['personnummer','period','foretagsnamn'];
        elementen.forEach(element => {
            if(placering[element] == null){
                returnelement = element;
            }
        });
        return returnelement;
    }

    return ( 
<div>
    {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
    <div className='data'>
        <div className="error">{error}</div>
        <table>
            <tr>
                <td>Elevens data</td>
                <td>period<select onChange={(e)=>handleChange(e)} id='period' name='period'>
                    <option >välj period</option>
                    {
                perioder?.length > 0 && perioder.map((period) => (
                <option value={period.periodnamn} >{period.periodnamn}</option>
                ))}
                </select></td>
                <td>företag<select onChange={(e)=>handleChange(e)} id='foretagsnamn' name='foretagsnamn'>
                <option >välj företag</option>

                    {
                foretag?.length > 0 && foretag.map((foretag) => (
                <option value={foretag.foretagsnamn} >{foretag.foretagsnamn}</option>
                ))}</select> </td>
            </tr>
        </table>
        <button value="Registrera" onClick={(e)=>handleClick()}>Registrera</button>
        <button value="Avbryt" onClick={(e)=>navigate("/Placerade")}>Avbryt</button>
    </div>
</div>   ); 
}

export default PlaceraCard;
