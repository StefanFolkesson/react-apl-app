import { saveLS } from "../components/functions";
import Login from "./LoginPage";

function Logout(){
    saveLS('user',"");
    saveLS('hash',"");
    saveLS('admin',"");
    return (
        <Login />
    )
}

export default Logout;