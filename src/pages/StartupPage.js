import { useEffect, useState } from "react";
import ElevRappCard from "../components/ElevRappCard";
import { loadLS } from "../components/functions";
import MainNavigation from "../components/layout/MainNavigation";
import Login from "./LoginPage";

function StartupPage(){
    let user = loadLS('user');
    let admin = loadLS('admin');
    let hash = loadLS('hash');
    const [elever, setElever ] = useState([]);
    const [eleverAll, setAllElever ] = useState([]);
    const API_URL ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&idag";
    const getIdag = async () => { 
        if(admin==0){
            const response = await fetch(`${API_URL}`);
            const data = await response.json();
           setElever(data.data);
        }
    }
    const API_URL2 ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&tillsnu";
    const getAll = async () => { 
        if(admin==0){
            const response = await fetch(`${API_URL2}`);
            const data = await response.json();
            setAllElever(data.data);
        }
    }
    useEffect(() => {
        getIdag();
        getAll();
    },[]);

    if(admin==0){
        return (
<div>
    {user==="null"||user===""||user==="undefined"?<Login />:<MainNavigation />}
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
        );
    }
    else {
        return (
<div>
    {user==="null"||user===""||user==="undefined"?<Login />:<MainNavigation />}
    <div>Förstasida</div>
    <div>
        Du är en admin
        Här är lite data
    </div>
</div>
        )
    }
}

export default StartupPage;