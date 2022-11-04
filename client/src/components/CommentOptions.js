import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import CommentApi from '../api/CommentApi';

const CommentOptions = ({
  comment,
  handleRefresh,
  handleEdit,
  canEdit,
  canDelete,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleDelete() {
    setShowDeleteModal(true);
  }

  function yesDelete() {
    CommentApi.deleteComment(comment?.id);
    handleRefresh();
  }

  return (
    <>
      {(canDelete || canEdit) && (
        <div className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 drop-shadow-md px-2 py-0.5 bg-white text-gray-500 border-regal-blue border-2 rounded cursor-pointer">
          {/* Edit button */}
          {canEdit && (
            <>
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
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete()}
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="lg"
                    color="#162750"
                  />
                </button>
              </span>
            </>
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
