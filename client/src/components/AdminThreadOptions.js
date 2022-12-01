import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import ThreadApi from "../api/ThreadApi";

export default function AdminMessageOptions(props) {
  const [showModal, setShowModal] = useState(false);

  function handleDelete() {
    setShowModal(true);
  }

  function handleEdit() {
    props.handleEdit(props.id);
  }

  function confirmDelete() {
    ThreadApi.deleteThread(props.id);
    props.handleRefresh();
    props.handleDelete();
  }

  return (
    <>
      <div className="absolute top-0 right-4 -translate-y-1/2 drop-shadow-md p-1 bg-white text-gray-500 border-gray-600 border rounded cursor-pointer">
        <span className="m-1 px-1">
          <button
            className="cursor-pointer"
            onClick={() => handleEdit(props.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </span>
        <span className="m-1 px-1">
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
            buttonCancelText="No"
            setShowModal={setShowModal}
            delete={() => confirmDelete()}
          />
        )}
      </div>
    </>
  );
}
