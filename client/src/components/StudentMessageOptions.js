import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export default function StudentMessageOptions(props) {
  function buttonHandler() {
    props.setValue(true);
  }
  return (
    <div className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 drop-shadow-md px-2 py-0.5 bg-white text-gray-500 border-regal-blue border-2 rounded cursor-pointer">
      <button onClick={buttonHandler} className="cursor-pointer">
        <FontAwesomeIcon icon={faComment} size="lg" color="#162750" />
      </button>
    </div>
  );
}
