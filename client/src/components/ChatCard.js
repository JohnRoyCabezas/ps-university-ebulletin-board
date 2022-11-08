import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import ChatOptions from './ChatOptions';
import ChatTextEditor from './ChatTextEditor';
import moment from 'moment';
import Cookies from 'js-cookie';

const ChatCard = ({ chat, handleRefresh, setChatId, setShowComments, showComments }) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const user = JSON.parse(Cookies.get('user') || '{}');

  useEffect(() => {
    if (user?.role_user?.role_id === 2) {
      setCanEdit(true);
      setCanDelete(true);
    } else if (user.id === chat.user_id) {
      setCanEdit(true);
      setCanDelete(true);
    } else {
      return;
    }
  }, []);

  useEffect(()=> {
    if(!showComments) setCommentsOpen(false);
  }, [showComments])

  return (
    <div>
      <div
        onMouseEnter={() => setIsShowOptions(true)}
        onMouseLeave={() => setIsShowOptions(false)}
        className="relative flex shadow-lg bg-white w-full border-b-2 p-6"
        style={{
          backgroundColor: isShowOptions || commentsOpen && showComments ? '#EAE8E8' : '',
        }}
      >
        <img
          onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
          className="mr-3 w-11 h-11 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={chat?.user?.avatar}
          alt="avatar"
        />
        <div className="flex w-full flex-col ml-2">
          <div className="flex justify-start items-center mb-2">
            <h5 className="font-bold">{chat?.user?.fullname}</h5>
            <span className="ml-2 text-xs">
              <i>{moment(chat?.created_at).fromNow()}</i>
            </span>
          </div>
          {isEditing ? (
            <div className="rounded ">
              <ChatTextEditor
                handleRefresh={handleRefresh}
                chatid={chat?.id}
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
            chat={chat}
            setChatId={setChatId}
            setShowComments={setShowComments}
            handleRefresh={handleRefresh}
            handleEdit={setIsEditing}
            canEdit={canEdit}
            canDelete={canDelete}
            setCardCommentsOpen={setCommentsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default ChatCard;
