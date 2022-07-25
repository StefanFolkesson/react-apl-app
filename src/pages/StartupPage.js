import { useEffect, useState } from "react";
import ElevCard from "../components/ElevCard";
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
    const sM = async () => { 
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        console.log(API_URL);
        console.log(data.data);
        setElever(data.data);
      }
    const API_URL2 ="/APL-app/readdata.php?hash="+hash+"&loginnamn="+user+"&tillsnu";
    const sM2 = async () => { 
        const response = await fetch(`${API_URL2}`);
        const data = await response.json();
        setAllElever(data.data);
    }
      useEffect(() => {
        sM();
        sM2();
      },[]);

if(admin==0){
    return (
        
        <div>
             {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
                <div>Förstasida</div>
            <div>Du är en handledare
            Här är dina elever</div>
            <ElevRappCard elever={elever}/>
            Och här är rapporteringen hittils:
            <ElevRappCard elever={eleverAll}/>
        </div>
    );
}
else {
    return (
    <div>
            {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
        <div>Förstasida</div>
        <div>            Du är en admin
            Här är lite data</div>
        </div>
    )
}
}

export default StartupPage;