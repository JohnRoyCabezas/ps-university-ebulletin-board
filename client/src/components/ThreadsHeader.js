import React from 'react';
import parse from 'html-react-parser';
import moment from 'moment';

const ThreadsHeader = ({thread}) => {
  return (
    <div className="relative flex bg-white w-full py-4 px-6">
      <img
        src={thread?.user?.avatar}
        className="rounded-full w-12 h-12"
        alt="Avatar"
      />
      <div className="flex flex-col ml-2">
        <div className="flex justify-start items-center">
          <h5 className="font-bold">{thread.user?.fullname}</h5>
          <span className="ml-2 text-xs">
            <i>{moment(thread?.created_at).fromNow()}</i>
          </span>
        </div>
        <div>
          <span className="text-gray-700 text-base">
            {parse(String(thread?.announcement))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThreadsHeader;
