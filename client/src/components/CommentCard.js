import React, { useState, useEffect } from "react";
import moment from "moment";
import CommentOptions from './CommentOptions';
import parse from 'html-react-parser';
import Cookies from "js-cookie";
import CommentTextEditor from "./CommentTextEditor";

const CommentCard = ({comment, handleRefresh}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const user = JSON.parse(Cookies.get('user') || '{}');

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
    <div>
      <div
        className="relative flex w-full px-6 py-4"
        onMouseEnter={() => setIsShowOptions(true)}
        onMouseLeave={() => setIsShowOptions(false)}
        style={{
          backgroundColor: isShowOptions ? '#EAE8E8' : '',
        }}
      >
        <img
          src={comment?.user?.avatar}
          className="rounded-full w-12 h-12"
          alt="Avatar"
        />
        <div className="flex flex-col ml-2">
          <div className="flex justify-start items-center">
            <h5 className="font-bold">{comment?.user?.fullname}</h5>
            <span className="ml-2 text-xs">
              <i>{moment(comment.created_at).fromNow()}</i>
            </span>
          </div>
          <div>
            {isEditing ? (
              <div className="px-5 w-full">
                <CommentTextEditor
                  commentId={comment?.id}
                  handleRefresh={handleRefresh}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              </div>
            ) : (
              <span className="text-gray-700 text-sm">
                {parse(comment?.comment)}
              </span>
            )}
          </div>
        </div>
        {isShowOptions && (
          <CommentOptions
            comment={comment}
            handleRefresh={handleRefresh}
            handleEdit={setIsEditing}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        )}
      </div>
    </div>
  );
}

export default CommentCard;
