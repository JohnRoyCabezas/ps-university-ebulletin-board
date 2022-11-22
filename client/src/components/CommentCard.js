import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import CommentOptions from './CommentOptions';
import parse from 'html-react-parser';
import CommentTextEditor from "./CommentTextEditor";
import { UserContext } from "../utils/UserContext";
import TextEditor from "./TextEditor";

const CommentCard = ({comment}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const {user} = useContext(UserContext);

  const [isShowOptions, setIsShowOptions] = useState(false);

  useEffect(() => {
      if (user?.role_user?.role_id === 2) {
        setCanEdit(true);
        setCanDelete(true);
      } 
      else if (user?.id === comment?.user_id) {
        setCanEdit(true);
        setCanDelete(true);
      }
       else {
        return;
      }
  }, []);
  
  return (
    <div
      className="relative flex w-full px-6 py-4 hover:bg-gray-200 text-sm text-gray-800"
      onMouseEnter={() => setIsShowOptions(true)}
      onMouseLeave={() => setIsShowOptions(false)}
    >
      <img
        src={comment?.user?.avatar}
        className="rounded-full w-12 h-12"
        alt="Avatar"
      />
      <div className="flex flex-col w-80 ml-2">
        <div>
          {isEditing ? (
            <div className="w-full">
              <TextEditor
                type="comment"
                comment={comment}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
          ) : (
            <>
              <div className="flex justify-startitems-center whitespace-nowrap">
                <h5 className="font-bold max-w-[50%] truncate">
                  {comment?.user?.fullname}
                </h5>
                <span className="ml-2 text-xs whitespace-nowrap">
                  <i>{moment(comment.created_at).fromNow()}</i>
                </span>
              </div>
              <span className="text-gray-700 text-sm ql-editor card">
                {parse(comment?.comment)}
              </span>
            </>
          )}
        </div>
      </div>
      {isShowOptions && (
        <CommentOptions
          comment={comment}
          handleEdit={() => setIsEditing(true)}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      )}
    </div>
  );
}

export default CommentCard;
