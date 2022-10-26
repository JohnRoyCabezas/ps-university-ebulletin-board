import React from 'react';
import moment from 'moment';

const ChatCard = ({ chat }) => {
  return (
    <div>
      <div className="relative flex shadow-lg bg-white w-full border-b-2 p-6">
        <img
          className="mr-3 w-11 h-11 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={chat?.user?.avatar}
          alt="JC"
        />
        <div className="flex flex-col ml-2">
          <div className="flex justify-start items-center mb-2">
            <h5 className="font-bold">{chat?.user?.fullname}</h5>
            <span className="ml-2 text-xs">
              <i>{moment(chat?.created_at).fromNow()}</i>
            </span>
          </div>
        <div className="text-gray-700 text-base">{chat.chat}</div>
        </div>
        {/* {isShown &&
          (userRole === "student" ? (
            <StudentMessageOptions setValue={setThreadValue} />
          ) : (
            <AdminMessageOptions
              id={props.chat.id}
              cancel={cancel}
              handleRefresh={props.handleRefresh}
              handleEdit={(id) => handleEdit(id)}
              setValue={setThreadValue}
            />
          ))} */}
      </div>
    </div>
  );
};

export default ChatCard;
