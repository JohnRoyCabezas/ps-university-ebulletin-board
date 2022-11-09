import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faPenToSquare,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import ChatApi from '../api/ChatApi';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

const ChatOptions = ({
  chat,
  comment,
  setChatId,
  setShowComments,
  handleRefresh,
  handleEdit,
  canEdit,
  canDelete,
  setCardCommentsOpen,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleDelete() {
    setShowDeleteModal(true);
  }

  const handleChatThread = () => {
    setChatId(chat?.id);
    setShowComments(true);
    setCardCommentsOpen(true);
  };

  function yesDelete() {
    ChatApi.deleteChat(chat?.id);
    handleRefresh();
  }

  return (
    <>
      <div className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 drop-shadow-md px-2 py-0.5 bg-white text-gray-500 border-regal-blue border-2 rounded cursor-pointer">
        {/* Show comments thread button */}
        <span className="m-1">
          <button className="cursor-pointer" onClick={handleChatThread}>
            <FontAwesomeIcon icon={faComment} size="lg" color="#162750" />
          </button>
        </span>

        {canEdit && (
          <>
            {/* Edit button */}
            <span className="m-1">
              <button
                className="cursor-pointer"
                onClick={() => handleEdit(true)}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="lg"
                  color="#162750"
                />
              </button>
            </span>
          </>
        )}

        {/* Delete button */}
        {canDelete && (
          <>
            <span className="m-1">
              <button className="cursor-pointer" onClick={() => handleDelete()}>
                <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#162750" />
              </button>
            </span>
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
