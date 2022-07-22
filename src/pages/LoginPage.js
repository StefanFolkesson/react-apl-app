import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveLS } from "../components/functions";
const API_URL ="/APL-app/readdata.php?hash=tt&loginnamn=stefan&elever";
function Login(props){
    const { state } = useLocation();
    let error="";
    if(state!=null){
        error=state.error;
    }
    let navigate = useNavigate();
    const [user, setUser ] = useState();
    const [password, setPassword ] = useState();

    const handleChangeUser = (e) => {
        setUser(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const sendData = () => {
        const API_URL ="/APL-app/login.php?anv="+user+"&pass="+password;
        console.log(API_URL);
        sendit(API_URL);
    }
    const sendit = async (url) => { 
      const response = await fetch(`${url}`);
      const data = await response.json();
      if(data.status=="0"){
        saveLS('user',data.data[0]['user']);
        saveLS('hash',data.data[0]['hash']);
        navigate('/');
      } else if(data.status=="1") {
        navigate('/Login',{state:{error:"nodata"}});
      } else if(data.status=="2") {
        navigate('/Login',{state:{error:"no user!"}});
      }
    }


  return (
        <div className="blank">
        <div className="loginForm">
            <div className="error">{error}</div>
            <h1 className="header"> Login </h1>
            <div><label>Username: <input type="text" value={user} onChange={handleChangeUser}></input></label></div>
            <div><label>Password: <input type="password" value={password} onChange={handleChangePassword}></input></label></div>
            <button onClick={() => sendData()}>Logga in</button>
      </div>
    </div>

    )
}

export default Login;