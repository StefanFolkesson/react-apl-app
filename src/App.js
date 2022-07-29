import { Route, Routes } from "react-router-dom";

import StartupPage from "./pages/StartupPage";
import VisaEleverPage from "./pages/VisaElever";
import VisaForetagPage from "./pages/VisaForetag";
import VisaHandledarePage from "./pages/VisaHandledare";
import VisaPerioderPage from "./pages/VisaPerioder";
import EditElevCard from "./components/EditElevCard";
import EditForetagCard from "./components/EditForetagCard";
import EditHandledareCard from "./components/EditHandledareCard";
import EditPeriodCard from "./components/EditPeriodCard";
import DeletePage from "./pages/Delete";
import CreatePage from "./pages/Create";
import Login from "./pages/LoginPage";
import Logout from "./pages/LogoutPage";
import PlaceradePage from "./pages/Placerade";
import PlaceraCard from "./components/PlaceraCard";


function App(){
    return <div>
        <Routes>
            <Route path="/" element ={<StartupPage />} />
            <Route path="/client-apl-app" element ={<StartupPage />} />
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
            <Route path="/Logout" element ={<Logout />} />
            <Route path="/Placerade" element ={<PlaceradePage />} />
            <Route path="/PlaceraCard" element ={<PlaceraCard />} />
        </Routes>
    </div>
}

export default App;