import { useLocation } from "react-router-dom";
import CreateElev from "../components/CreateElevCard";
import CreateForetag from "../components/CreateForetagCard";
import CreatePeriod from "../components/CreatePeriodCard";
import CreateHandledare from "../components/CreateHandledareCard";


function CreatePage(){
  const { state } = useLocation();
  const typ = state.typ;
  switch (typ) {
    case 'Elever':
        return <CreateElev />;
    case 'Handledare':
        return <CreateHandledare />
    case 'Foretag':
        return <CreateForetag />
    case 'Perioder':
        return <CreatePeriod />
  }
}

export default CreatePage;