import { useLocation, useNavigate } from "react-router-dom";

const EditForetag = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const ftg = state.ftg;
    return <div></div>
}

export default EditForetag;