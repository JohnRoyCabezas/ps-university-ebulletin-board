import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPenToSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import ChatApi from "../api/ChatApi";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const ChatOptions = ({
  chat,
  setShowComments,
  setChat,
  handleEdit,
  canEdit,
  canDelete,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleDelete() {
    setShowDeleteModal(true);
  }

  const handleChatThread = () => {
    setChat(chat);
    setShowComments(true);
  };

  function yesDelete() {
    ChatApi.deleteChat(chat?.id);
  }

  return (
    <>
      <div className="absolute top-0 right-4 -translate-y-1/2 drop-shadow-md p-0.5 bg-white text-gray-600 border-gray-600 border rounded cursor-pointer">
        {/* Show comments thread button */}
        <button
          className="cursor-pointer rounded text-gray-600 py-1 px-2 hover:bg-gray-200"
          onClick={handleChatThread}
        >
          <FontAwesomeIcon icon={faComment}/>
        </button>

        {canEdit && (
          <>
            {/* Edit button */}
            <button
              className="cursor-pointer rounded text-gray-600 py-1 px-2 hover:bg-gray-200"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </>
        )}

        {/* Delete button */}
        {canDelete && (
          <>
            <button
              className="cursor-pointer rounded text-gray-600 py-1 px-2 hover:bg-gray-200"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </>
        )}
      </div>
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

export default ChatOptions;
