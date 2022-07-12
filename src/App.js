import { Route, Routes } from "react-router-dom";

import StartupPage from "./pages/StartupPage";
import EleverPage from "./pages/Elever";
import ForetagPage from "./pages/Foretag";
import HandledarePage from "./pages/Handledare";
import PerioderPage from "./pages/Perioder";
import MainNavigation from "./components/layout/MainNavigation";

function App(){
    return <div>
        <MainNavigation />
        <Routes>
            <Route path="/" element ={<StartupPage />} />
            <Route path="/Elever" element ={<EleverPage />} />
            <Route path="/Foretag" element ={<ForetagPage />} />
            <Route path="/Handledare" element ={<HandledarePage />} />
            <Route path="/Perioder" element ={<PerioderPage />} />
        </Routes>
    </div>;
}

export default App;