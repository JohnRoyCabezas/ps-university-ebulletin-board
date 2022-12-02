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
    AnnouncementApi.deleteAnnouncement(props.id).then((res) => {
      props.handleRefresh();
    });
    props.setValue(false);
  }

  function buttonHandler() {
    props.setValue(true);
  }

  return (
    <>
      <div className="absolute top-0 right-4 -translate-y-1/2 drop-shadow-md py-1 bg-white text-gray-500 border-gray-600 border rounded cursor-pointer">
        {/* Show thread button */}
        <span
          className="py-1 px-2 rounded text-gray-600 hover:bg-gray-200"
          onClick={buttonHandler}
        >
          <button className="cursor-pointer">
            <FontAwesomeIcon icon={faComment} />
          </button>
        </span>

        {/* Edit button */}
        <span className="py-1 px-2 rounded text-gray-600 hover:bg-gray-200">
          <button
            className="cursor-pointer"
            onClick={() => handleEdit(props.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </span>

        {/* Delete button */}
        <span className="py-1 px-2 rounded text-gray-600 hover:bg-gray-200">
          <button className="cursor-pointer" onClick={() => handleDelete()}>
            <FontAwesomeIcon icon={faTrashAlt} />
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
