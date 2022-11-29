import React from "react";
import parse from "html-react-parser";
import moment from "moment";

const CommentsHeader = ({ chat }) => {
  return (
    <div className="relative flex bg-white w-full px-6 py-4">
      <img
        src={chat?.user?.avatar}
        className="rounded-full w-12 h-12"
        alt="Avatar"
      />
      <div className="flex flex-col ml-2 w-80 text-sm">
        <div className="flex justify-start items-center">
          <h5 className="font-bold max-w-[50%] truncate">
            {chat.user?.fullname}
          </h5>
          <span className="ml-2 text-xs whitespace-nowrap">
            <i>{moment(chat?.created_at).fromNow()}</i>
          </span>
        </div>
        <div>
          <span className="text-gray-700 text-sm">
            {parse(String(chat?.chat))}
            <div className="flex">
              {chat?.media?.map((acceptedFile, i) => (
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
        </div>
      </div>
    </div>
  );
};

export default CommentsHeader;
