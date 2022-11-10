import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SubmitButton = (props) => {

    return (
        <div className="mt-8">
            <button
                type="submit"
                disabled={!props.buttonDisabled || props.processing ? true : false}
                className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-regal-blue rounded-md ${props.buttonDisabled ? `text-white transition-colors duration-200 transform bg-regal-blue dark:bg-secondary-background dark:hover:bg-secondary-background hover:bg-blue-900 focus:outline-none focus:bg-blue-900` : `bg-gray-300 dark:bg-background text-gray-400`}`}
                  onClick={props.handleSubmit}
            >
                {props.processing ? <span><FontAwesomeIcon icon={faSpinner} spin /> Processing...</span> : props.buttonTitle}
            </button>
        </div>
    )
}

export default SubmitButton;
