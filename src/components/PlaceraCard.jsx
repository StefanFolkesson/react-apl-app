import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadLS } from "./functions";

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
        setPerioder(dataPeriod.data);
    }


    const getForetag = async () => {
        const responseFtg = await fetch(`${API_URL_FORETAG}`);
        const dataFtg = await responseFtg.json();
        setForetag(dataFtg.data);
    }
    useEffect(() => {
        getPerioder();
        getForetag();
    },[]);
  
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

    const handleChange = (e) => {
        const {name,value} = e.target;
        setPlacering(prevState =>({
            ...prevState,
            [name]:value
        }));
    }
    const handleClick = (e) => {
        let check=checkData();
        if(check==true){
            str="&personnummer="+placering.personnummer+"&period="+placering.period+"foretagsnamn="+placering.foretagsnamn;
            sendit(API_URL_PLACERING+str);
        }
        else{
            document.getElementById(answer).focus();
        }
    }
    function checkData() {
        let returnelement=true;
        elementen=[personnummer,period,foretagsnamn];
        elementen.forEach(element => {
            if(placering[element] == null){
                returnelement = element;
            }
        });
        return returnelement;
}

        return ( 
        <div>
                          <div className='data'>
                <table>
                <tr>
                    <td>Elevens data</td>
                    <td>period<select onChange={handleChange} id='period'>{
                        perioder?.length > 0 && perioder.map((period) => (
                            <option value={period.periodnamn} name='period'>{period.periodnamn}</option>
                        ))}
                        </select></td>
                    <td>företag<select onChange={handleChange} id='foretagsnamn'>{
                        foretag?.length > 0 && foretag.map((period) => (
                            <option value={foretag.foretagsnamn} name='foretagsnamn'>{foretag.foretagsnamn}</option>
                        ))}</select> </td>
                </tr>
                <button value="Registrera" onClick={handleClick()}></button>
                <button value="Avbryt" onClick={navigate("/")}></button>
            </table>
            </div>
          </div>   ); 
}

export default PlaceraCard;
