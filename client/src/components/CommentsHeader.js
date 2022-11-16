import React from 'react';
import parse from 'html-react-parser';
import moment from 'moment';

const CommentsHeader = ({chat}) => {
  return (
    <div className="relative flex bg-white w-full py-4 px-6">
      <img
        src={chat?.user?.avatar}
        className="rounded-full w-12 h-12"
        alt="Avatar"
      />
      <div className="flex flex-col ml-2 w-52 text-sm">
        <div className="flex justify-start items-center">
          <h5 className="font-bold max-w-[50%] truncate">{chat.user?.fullname}</h5>
          <span className="ml-2 text-xs whitespace-nowrap">
            <i>{moment(chat?.created_at).fromNow()}</i>
          </span>
        </div>
        <div>
          <span className="text-gray-700 text-sm">
            {parse(String(chat?.chat))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentsHeader;
