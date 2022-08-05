import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ElevRappCard from "../components/ElevRappCard";
import { loadLS } from "../components/functions";
import MainNavigation from "../components/layout/MainNavigation";
import Login from "./LoginPage";
import VisaPlaceradeCard from "./VisaPlacerade";

function StartupPage(){
    const { state } = useLocation();
    let user = loadLS('user');
    let admin = loadLS('admin');
    let hash = loadLS('hash');
    const [elever, setElever ] = useState([]);
    const [eleverAll, setAllElever ] = useState([]);
    let error="";
    if(state!=null){
      error=state.error;
    }

    const getIdag = async () => { 
        let API_URL = "/APL-app/readdata.php?hash=";
        if(admin==0){
            API_URL ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&idag";
        } else 
        {
            API_URL ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&orapporterade"; // Gör inte det jag vill
        }
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        setElever(data.data);
    }
    const getAll = async () => { 
        let API_URL2 ="/APL-app/readdata.php?hash=";
        if(admin==0){
            API_URL2 ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&tillsnu";
        } else {
            API_URL2 ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&orapporterade";
        }
        const response = await fetch(`${API_URL2}`);
        const data = await response.json();
        setAllElever(data.data);
    }
    useEffect(() => {
        getIdag();
        getAll();
    },[]);

    if(admin==0){
        return (
<div>
    {user==="null"||user===""||user==="undefined"?<Login />:<MainNavigation />}
    <div className="listVy w100">
    <div className="error">{error}</div>
    <div>Förstasida</div>
    <div>
        Du är en handledare
        Här är dina elever

        Visa vilka elever som inte rapporterats idag. 
    </div>
    <ElevRappCard elever={elever}/>
    Och här är rapporteringen hittils:
    <ElevRappCard elever={eleverAll}/>
</div>
</div>
        );
    }
    else {
        return (
<div>
    {user==="null"||user===""||user==="undefined"?<Login />:<MainNavigation />}
    <div className="listVy w100">
    <div className="error">{error}</div>
    <div>Förstasida</div>
    <div>
        Du är en admin
        Dessa elever är de som behöver rapporteras idag:
        <ElevRappCard elever={elever}/>
        Dessa elever är ute på praktik just nu.
        <VisaPlaceradeCard />
    </div>
</div>
</div>
        )
    }
}

export default StartupPage;