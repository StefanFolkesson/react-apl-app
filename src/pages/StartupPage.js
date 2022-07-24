import { loadLS } from "../components/functions";
import MainNavigation from "../components/layout/MainNavigation";
import Login from "./LoginPage";

function StartupPage(){
    let user = loadLS('user');
    let admin = loadLS('admin');
    return (
    <div>
            {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
        <div>Förstasida</div>
        {admin==0?(
            <div>Du är en handledare
            Här är dina elever</div>
        ):(
<div>            Du är en admin
            Här är lite data</div>
        )}
        </div>
    )
}

export default StartupPage;