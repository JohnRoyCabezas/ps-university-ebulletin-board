import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

export default function AdminMessageOptions() {
  return (
    <div className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 drop-shadow-md px-2 py-0.5 bg-white text-gray-500 border-regal-blue border-2 rounded cursor-pointer">
      <FontAwesomeIcon icon={faComment} size="lg" color="#162750" />
      <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#162750" className="mx-4"/>
      <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#162750" />
    </div>
  );
}
