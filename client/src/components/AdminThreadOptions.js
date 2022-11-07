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

  function yesDelete() {
    ThreadApi.deleteThread(props.id);
    props.handleRefresh();
  }

  return (
    <><div className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 drop-shadow-md px-2 py-0.5 bg-white text-gray-500 border-regal-blue border-2 rounded cursor-pointer">
      <span className="m-1"><button className="cursor-pointer" onClick={() => handleEdit(props.id)}><FontAwesomeIcon icon={faPenToSquare} size="lg" color="#162750" /></button></span>
      <span className="m-1"><button className="cursor-pointer" onClick={() => handleDelete()}><FontAwesomeIcon icon={faTrashAlt} size="lg" color="#162750" /></button></span>
    </div><div>
        {showModal &&
          <DeleteModal
            message='Are you sure you want to remove this message?'
            buttonConfirmText='Yes'
            buttonCancelText='No'
            setShowModal={setShowModal}
            delete={() => yesDelete()}
          />}
      </div></>
  );
}
