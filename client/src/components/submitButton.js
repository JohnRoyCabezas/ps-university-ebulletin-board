import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const SubmitButton = (props) => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className="mt-8">
            <button
                type="submit"
                disabled={!props.buttonDisabled || props.processing ? true : false}
                className={`w-full px-4 py-2  tracking-wide text-white transition-colors hover:bg-opacity-80 duration-200 transform rounded-md ${props.buttonDisabled ? theme : `bg-gray-300 text-gray-400`}`}
                onClick={props.handleSubmit}
            >
                {props.processing ? <span><FontAwesomeIcon icon={faSpinner} spin /> Processing...</span> : props.buttonTitle}
            </button>
        </div>
    )
}

export default SubmitButton;
