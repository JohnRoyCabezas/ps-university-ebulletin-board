import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import ChatOptions from './ChatOptions';
import ChatTextEditor from './ChatTextEditor';
import moment from 'moment';
import Cookies from 'js-cookie';

const ChatCard = ({ chatid, chat, handleRefresh }) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const user = JSON.parse(Cookies.get('user') || '{}');

  useEffect(() => {
    if (user?.role_user?.role_id === 2) {
      setCanEdit(true);
      setCanDelete(true);
    } else if (user.id === chat.user_id){
      setCanEdit(true);
      setCanDelete(true);
    } else {
      return
    }
  }, []);

  return (
    <div>
      <div
        onMouseEnter={() => setIsShowOptions(true)}
        onMouseLeave={() => setIsShowOptions(false)}
        className="relative flex shadow-lg bg-white w-full border-b-2 p-6"
      >
        <img
          className="mr-3 w-11 h-11 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={chat?.user?.avatar}
          alt="avatar"
        />
        <div className="flex flex-col ml-2">
          <div className="flex justify-start items-center mb-2">
            <h5 className="font-bold">{chat?.user?.fullname}</h5>
            <span className="ml-2 text-xs">
              <i>{moment(chat?.created_at).fromNow()}</i>
            </span>
          </div>
          {isEditing ? (
            <div className="rounded w-full bg-white">
              <ChatTextEditor
                handleRefresh={handleRefresh}
                chatid={chatid}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
          ) : (
            <span className="text-gray-700 text-base">{parse(chat.chat)}</span>
          )}
        </div>

        {isShowOptions && (
          <ChatOptions
            chatid={chatid}
            handleRefresh={handleRefresh}
            handleEdit={setIsEditing}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ChatCard;
