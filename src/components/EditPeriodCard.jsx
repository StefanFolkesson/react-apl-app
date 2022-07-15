import { useLocation, useNavigate } from "react-router-dom";

const EditPeriod = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const period = state.peroid;
    return <div></div>
}

export default EditPeriod;