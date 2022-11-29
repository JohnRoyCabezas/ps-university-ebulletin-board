import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import CommentOptions from './CommentOptions';
import parse from 'html-react-parser';
import CommentTextEditor from "./CommentTextEditor";
import { UserContext } from "../utils/UserContext";

const CommentCard = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const {user} = useContext(UserContext);

  const [isShowOptions, setIsShowOptions] = useState(false);

  useEffect(() => {
    if (user?.role_user?.role_id === 2) {
      setCanEdit(true);
      setCanDelete(true);
    } else if (user?.id === comment?.user_id) {
      setCanEdit(true);
      setCanDelete(true);
    } else {
      return;
    }
  }, []);

  return (
    <div>
      <div
        className="relative flex w-full px-6 py-4 hover:bg-gray-200 text-sm"
        onMouseEnter={() => setIsShowOptions(true)}
        onMouseLeave={() => setIsShowOptions(false)}
      >
        <img
          src={comment?.user?.avatar}
          className="rounded-full w-12 h-12"
          alt="Avatar"
        />
        <div className="flex flex-col ml-2">
          <div className="flex justify-start w-52 items-center whitespace-nowrap">
            <h5 className="font-bold max-w-[50%] truncate">
              {comment?.user?.fullname}
            </h5>
            <span className="ml-2 text-xs whitespace-nowrap">
              <i>{moment(comment.created_at).fromNow()}</i>
            </span>
          </div>
          <div>
            {isEditing ? (
              <div className="px-5 w-full">
                <CommentTextEditor
                  commentId={comment?.id}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              </div>
            ) : (
              <span className="text-gray-700 text-sm ql-editor card">
                {parse(comment?.comment)}
                <div className="flex">
                  {comment?.media.map((acceptedFile, i) => (
                    <div key={i}>
                      {acceptedFile.mime_type.includes("image") ? (
                        <img
                          className="h-20 w-20 d-flex mr-5"
                          src={`${acceptedFile.original_url}`}
                        />
                      ) : (
                        <div>
                          <a
                            href={`${acceptedFile.original_url}`}
                            target="_blank"
                            className="cursor-pointer text-xs font-semibold text-sky-600 underline decoration-sky-500 mr-5"
                          >
                            {acceptedFile.file_name}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </span>
            )}
          </div>
        </div>
      </div>
      {isShowOptions && (
        <CommentOptions
          comment={comment}
          handleEdit={setIsEditing}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      )}
    </div>
  );
};

export default CommentCard;
