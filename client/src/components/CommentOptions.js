import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import CommentApi from "../api/CommentApi";

const CommentOptions = ({ comment, handleEdit, canEdit, canDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleDelete() {
    setShowDeleteModal(true);
  }

  function yesDelete() {
    CommentApi.deleteComment(comment?.id);
  }

  return (
    <>
      {(canDelete || canEdit) && (
        <div className="absolute top-0 right-4 -translate-y-1/2 drop-shadow-md p-0.5 bg-white text-gray-600 border-gray-600 border rounded cursor-pointer">
          {/* Edit button */}
          {canEdit && (
            <button
              className="cursor-pointer rounded text-gray-600 py-1 px-2 hover:bg-gray-200"
              onClick={() => handleEdit(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}

          {/* Delete button */}
          {canDelete && (
            <button
              className="cursor-pointer rounded text-gray-600 py-1 px-2 hover:bg-gray-200"
              onClick={() => handleDelete()}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          )}
        </div>
      )}

      <div>
        {showDeleteModal && (
          <DeleteModal
            message="Are you sure you want to remove this message?"
            buttonConfirmText="Yes"
            cancel={() => setShowDeleteModal(false)}
            buttonCancelText="No"
            setShowModal={setShowDeleteModal}
            delete={() => yesDelete()}
          />
        )}
      </div>
    </>
  );
};

export default CommentOptions;
