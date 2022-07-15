import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function DeletePage(){
  let navigate = useNavigate();
  const { state } = useLocation();
  const id = state.id;
  const typ = state.typ;
  let str="";
  const API_URL ="/APL-app/deletedata.php?hash=tt&anvnamn=stefan";

  useEffect(() => {
    sendit();
  },[]);

  const sendit = async () => { 
    switch (typ) {
      case 'Elever':
        str="&delelev&pnr="+id;
      case 'Handledare':
        str="&delperiod&periodnamn="+id;
      case 'Foretag':
        str="&delforetag&foretagsnamn="+id;
      case 'Perioder':
        str="&delhandledare&anvandarnamn="+id;
      case 'Placering':
          str="&delplacering&id="+id;
      }
    const response = await fetch(`${API_URL+str}`);
    const data = await response.json();
    if(data.status=="0"){
        navigate('/'+typ);
    } else if(data.status=="1") {
        // skall poppa upp ett felmeddelande. och stanna kvar... 
    } else if(data.status=="2") {
        navigate('/Login');
    }
  }
  return <div>Element isnt deletable</div>
}

export default DeletePage;