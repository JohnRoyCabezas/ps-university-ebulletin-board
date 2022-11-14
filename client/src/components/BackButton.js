import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({link}) => {
    const navigate = useNavigate();

    return (
        <button className='mr-2' onClick={() => navigate(link)}><FontAwesomeIcon icon={faArrowLeft} /></button>
    )
}

export default BackButton;