import React from "react";
import parse from "html-react-parser";
import moment from "moment";

const ThreadsHeader = ({ thread }) => {
  return (
    <div className="relative flex bg-white w-full py-4 px-6">
      <img
        onError={(e) =>
          (e.target.src =
            "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360")
        }
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
          <span className="text-gray-700 text-base ql-editor card">
            {parse(String(thread?.announcement))}
            <div className="flex">
              {thread?.media.map((acceptedFile, i) => (
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

export default ThreadsHeader;
