import { Route, Routes } from "react-router-dom";

import StartupPage from "./pages/StartupPage";
import EleverPage from "./pages/Elever";
import ForetagPage from "./pages/Foretag";
import HandledarePage from "./pages/Handledare";
import PerioderPage from "./pages/Perioder";
import MainNavigation from "./components/layout/MainNavigation";
import EditElevPage from "./pages/Editelev";
import DeletePage from "./pages/Delete";
import CreatePage from "./pages/Create";
import { useEffect } from "react";

function App(){
    localStorage.setItem('user',"stefan");
    localStorage.setItem('password',"stefan");
    localStorage.setItem('hash',"tt");
    const API_URL ="/APL-app/login.php?anv=stefan&pass=stefan";
    const login = async () => { 
        const response = await fetch(`${API_URL}`);
        //const data = await response.json();
      }
      
    useEffect(() => {
        login();
    },[]);
    return <div>
        <MainNavigation />
        <Routes>
            <Route path="/" element ={<StartupPage />} />
            <Route path="/Elever" element ={<EleverPage />} />
            <Route path="/EditElev" element ={<EditElevPage />} />
            <Route path="/Delete" element ={<DeletePage />} />
            <Route path="/Foretag" element ={<ForetagPage />} />
            <Route path="/Handledare" element ={<HandledarePage />} />
            <Route path="/Perioder" element ={<PerioderPage />} />
            <Route path="/Create" element={<CreatePage />} />
        </Routes>
    </div>;
}

export default App;