import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPenToSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import AnnouncementApi from "../api/AnnouncementApi";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function AdminMessageOptions(props) {
  const [showModal, setShowModal] = useState(false);

  function handleEdit(id) {
    props.handleEdit(id);
  }

  function handleDelete() {
    setShowModal(true);
  }

  function confirmDelete() {
    AnnouncementApi.deleteAnnouncement(props.id);
    props.handleRefresh();
    props.handleDelete()
  }

  function buttonHandler() {
    props.setValue(true);
  }
  
  return (
    <>
      <div className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 drop-shadow-md px-2 py-0.5 bg-white text-gray-500 border-regal-blue border-2 rounded cursor-pointer">

        {/* Show thread button */}
        <span className="m-1">
          <button onClick={buttonHandler} className="cursor-pointer">
            <FontAwesomeIcon icon={faComment} size="lg" color="#162750" />
          </button>
        </span>

        {/* Edit button */}
        <span className="m-1">
          <button
            className="cursor-pointer"
            onClick={() => handleEdit(props.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#162750" />
          </button>
        </span>

        {/* Delete button */}
        <span className="m-1">
          <button className="cursor-pointer" onClick={() => handleDelete()}>
            <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#162750" />
          </button>
        </span>

      </div>
      <div>
        {showModal && (
          <DeleteModal
            message="Are you sure you want to remove this message?"
            buttonConfirmText="Yes"
            cancel={props.cancel}
            buttonCancelText="No"
            setShowModal={setShowModal}
            delete={() => confirmDelete()}
          />
        )}
      </div>
    </>
  );
}
