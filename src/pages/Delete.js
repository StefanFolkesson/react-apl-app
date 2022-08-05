import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadLS } from "../components/functions";

function DeletePage(){
  let navigate = useNavigate();
  const { state } = useLocation();
  const id = state.id;
  const typ = state.typ;
  const [user,setUser] = useState(loadLS('user'));
  const [hash,setHash] = useState(loadLS('hash'));
  const API_URL ="/APL-app/deletedata.php?hash="+hash+"&loginnamn="+user;
  console.log(id);
  useEffect(() => {
    sendit(typ);
  },[]);

  const sendit = async (typ) => { 
    let str;
    switch (typ) {
      case 'Elever':
        str="&delelev&pnr="+id;
        break;
      case 'Perioder':
        str="&delperiod&periodnamn="+id;
        break;
      case 'Foretag':
        str="&delforetag&foretagsnamn="+id;
        break;
      case 'Handledare':
        str="&delhandledare&anvnamn="+id;
        break;
      case 'Placerade':
          str="&delplacering&pid="+id;
          break;
        }
    const response = await fetch(`${API_URL+str}`);
    const data = await response.json();
    if(data.status==="0"){
        navigate('/'+typ);
    } else if(data.status==="1") {
        navigate('/'+typ, { state: { error: 'Element isnt deletable!'} });
    } else if(data.status==="2") {
        navigate('/Login');
    }
    else {
      navigate('/'+typ, { state: { error: 'Something is really wrong!'} });
    }
  }
  return <div></div>
}

export default DeletePage;