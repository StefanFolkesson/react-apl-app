import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ElevCard from "../components/ElevCard";
import { loadLS } from "../components/functions";
import MainNavigation from "../components/layout/MainNavigation";
import OplaceradeCard from "../components/OplaceradeCard";
import PlaceradeCard from "../components/PlaceradeCard";
import Login from "./LoginPage";

function PlaceradePage(props){
    let user = loadLS('user');
    let admin = loadLS('admin');
    let hash = loadLS('hash');
    return (
      <div>
      {user=="null"||user==""||user=="undefined"?<Login />:<MainNavigation />}
        <div className="listVy w100">
            <div>
            Dessa elever har inga placeringar (top 20? med direkturval )
            <OplaceradeCard />
            </div>
            <div>
            Dessa elever är placerade ( top 20)
            <PlaceradeCard />
                
            </div>

    </div>
    </div>

    )
}

export default PlaceradePage;