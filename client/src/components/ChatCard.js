import React, { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import ChatOptions from "./ChatOptions";
import TextEditor from "./TextEditor";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../utils/UserContext";

const ChatCard = ({ chat, chatObj, setChatObj, setShowComments }) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [hoverReply, setHoverReply] = useState(false);
  const {user} = useContext(UserContext);

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

  const handleClick = () => {
    setShowComments(true);
    setChatObj(chat);
  };

  return (
    <div>
      <div
        onMouseEnter={() => setIsShowOptions(true)}
        onMouseLeave={() => setIsShowOptions(false)}
        className={`relative flex bg-white w-full px-4 py-2 text-gray-800 hover:bg-gray-200 
        ${chat?.id === chatObj?.id && "bg-gray-200"}`}
      >
        <img
          onError={(e) =>
            (e.target.src =
              "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360")
          }
          className="ml-4 w-11 h-11 rounded border bg-white border-gray-400"
          src={chat?.user?.avatar}
          alt="avatar"
        />
        <div className="flex w-full flex-col ml-2">
          {isEditing ? (
            <div className="rounded">
              <TextEditor
                type="chat"
                object={chat}
                updateMessage={chat?.chat}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </div>
          ) : (
            <>
              <div className="flex justify-start items-center">
                <h5 className="font-bold max-w-[50%] truncate">
                  {chat?.user?.fullname}
                </h5>
                <span className="ml-2 text-xs whitespace-nowrap">
                  <i>{moment(chat?.created_at).fromNow()}</i>
                </span>
              </div>
              <span className="text-gray-700 text-sm">{parse(chat?.chat)}</span>
              {chat?.comments?.length > 0 && (
                <div
                  onMouseEnter={() => setHoverReply(true)}
                  onMouseLeave={() => setHoverReply(false)}
                  onClick={handleClick}
                  className={`flex justify-between mt-2 text-sm text-slate-500 w-1/2 p-1 border border-gray-400 border-opacity-0 rounded cursor-pointer ${
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
                        chat?.comments[chat?.comments.length - 1].user?.avatar
                      }
                      alt="avatar"
                    />
                    <span
                      className={`text-xs font-bold text-sky-600 ${
                        hoverReply && "underline decoration-sky-500"
                      }`}
                    >
                      {chat?.comments?.length}{" "}
                      {chat?.comments?.length > 1 ? "replies" : "reply"}
                    </span>
                    {hoverReply ? (
                      <span className="ml-1 text-xs">View replies</span>
                    ) : (
                      <span className="ml-1 text-xs">
                        {moment(
                          chat?.comments[chat?.comments.length - 1].created_at
                        )
                          .startOf("minute")
                          .fromNow()}
                      </span>
                    )}
                  </div>
                  <div>
                    {hoverReply && (
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        size="sm"
                        className="mx-2"
                      />
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {isShowOptions && (
          <ChatOptions
            chat={chat}
            setChat={setChatObj}
            setShowComments={setShowComments}
            handleEdit={() => setIsEditing(true)}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ChatCard;
