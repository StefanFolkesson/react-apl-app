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
  {user==="null"||user===""||user==="undefined"?<Login />:<MainNavigation />}
  <div className="listVy w100">
    <div>
      Dessa elever har inga placeringar
      <OplaceradeCard />
    </div>
    <div>
      Dessa elever är placerade 
      <PlaceradeCard />
    </div>
  </div>
</div>
    )
}

export default PlaceradePage;