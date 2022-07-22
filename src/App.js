import { Route, Routes } from "react-router-dom";

import StartupPage from "./pages/StartupPage";
import VisaEleverPage from "./pages/VisaElever";
import VisaForetagPage from "./pages/VisaForetag";
import VisaHandledarePage from "./pages/VisaHandledare";
import VisaPerioderPage from "./pages/VisaPerioder";
import MainNavigation from "./components/layout/MainNavigation";
import EditElevCard from "./components/EditElevCard";
import EditForetagCard from "./components/EditForetagCard";
import EditHandledareCard from "./components/EditHandledareCard";
import EditPeriodCard from "./components/EditPeriodCard";
import DeletePage from "./pages/Delete";
import CreatePage from "./pages/Create";
import { useEffect } from "react";
import Login from "./pages/LoginPage";
import { loadLS, saveLS } from "./components/functions";


function App(){
    console.log("Cookie : "+document.cookie);
//    saveLS('user',null);
    let user=loadLS('user');
    console.log("user : "+user);
    let hash=loadLS('key');
    console.log("Cookie : "+document.cookie);
//    localStorage.setItem('user',"stefan");
 //   localStorage.setItem('password',"stefan");
 //   localStorage.setItem('hash',"tt");
 //   const API_URL ="/APL-app/login.php?anv=".user."&pass=stefan";
 //   const login = async () => { 
 //       const response = await fetch(`${API_URL}`);
  //      //const data = await response.json();
//      }
      
 //   useEffect(() => {
  //      login();
//    },[]);
    return <div>
        {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
        User {user}
        <Routes>
            <Route path="/" element ={<StartupPage />} />
            <Route path="/Elever" element ={<VisaEleverPage />} />
            <Route path="/Delete" element ={<DeletePage />} />
            <Route path="/Foretag" element ={<VisaForetagPage />} />
            <Route path="/Handledare" element ={<VisaHandledarePage />} />
            <Route path="/Perioder" element ={<VisaPerioderPage />} />
            <Route path="/Create" element={<CreatePage />} />
            <Route path="/EditElev" element ={<EditElevCard />} />
            <Route path="/EditForetag" element ={<EditForetagCard />} />
            <Route path="/EditHandledare" element ={<EditHandledareCard />} />
            <Route path="/EditPeriod" element ={<EditPeriodCard />} />
            <Route path="/Login" element ={<Login />} />
        </Routes>
    </div>;
}

export default App;