import React, { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ReplyBar = ({ announcement, showThread }) => {
  const [hoverReply, setHoverReply] = useState(false);

  const handleClick = () => {
    showThread(true);
  };

  return (
    announcement.thread?.length > 0 && (
      <div
        onMouseEnter={() => setHoverReply(true)}
        onMouseLeave={() => setHoverReply(false)}
        onClick={handleClick}
        className={`flex justify-between mt-2 text-sm text-slate-500 w-1/2 p-1 border border-gray-400 border-opacity-0 rounded hover:cursor-pointer ${
          hoverReply && "border-opacity-100 border-gray-400 bg-white"
        }`}
      >
        <div className="flex items-center">
          <img
            onError={(e) =>
              (e.target.src =
                "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360")
            }
            className="mr-2 w-5 h-5 rounded border bg-white border-gray-400"
            src={
              announcement?.thread[announcement?.thread?.length - 1].user
                ?.avatar
            }
            alt="avatar"
          />
          <span
            className={`text-xs font-bold text-sky-600 ${
              hoverReply && "underline decoration-sky-500"
            }`}
          >
            {announcement?.thread?.length}{" "}
            {announcement?.thread?.length > 1 ? "replies" : "reply"}
          </span>
          {hoverReply ? (
            <span className="ml-1 text-xs">View replies</span>
          ) : (
            <span className="ml-1 text-xs">
              {moment(
                announcement?.thread[announcement?.thread.length - 1].created_at
              )
                .startOf("minute")
                .fromNow()}
            </span>
          )}
        </div>
        <div>
          {hoverReply && (
            <FontAwesomeIcon icon={faChevronRight} size="sm" className="mx-2" />
          )}
        </div>
      </div>
    )
  );
};

export default ReplyBar;
