import React from 'react';
import parse from 'html-react-parser';
import moment from 'moment';

const CommentsHeader = ({chat}) => {
  return (
    <div className="relative flex shadow-lg bg-white w-full border-b-2 p-6">
      <img
        src={chat?.user?.avatar}
        className="rounded-full w-12 h-12"
        alt="Avatar"
      />
      <div className="flex flex-col ml-2">
        <div className="flex justify-start items-center mb-2">
          <h5 className="font-bold">{chat.user?.fullname}</h5>
          <span className="ml-2 text-xs">
            <i>{moment(chat?.created_at).fromNow()}</i>
          </span>
        </div>
        <div>
          <span className="text-gray-700 text-base">
            {parse(String(chat?.chat))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentsHeader;
