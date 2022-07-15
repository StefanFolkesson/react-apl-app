import { useLocation, useNavigate } from "react-router-dom";

const EditHandledare = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const handledare = state.handledare;
    return <div></div>
}

export default EditHandledare;