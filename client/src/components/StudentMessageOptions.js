import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export default function StudentMessageOptions(props) {
  function buttonHandler() {
    props.setValue(true);
  }
  return (
    <div className="absolute top-0 right-4 -translate-y-1/2 drop-shadow-md py-0.5 bg-white text-gray-500 border-gray-600 border rounded cursor-pointer">
      <button
        onClick={buttonHandler}
        className="py-1 px-2 rounded text-gray-600 hover:bg-gray-200"
      >
        <FontAwesomeIcon icon={faComment} />
      </button>
    </div>
  );
}
