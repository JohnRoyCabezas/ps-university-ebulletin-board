import { React, useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import CommentsHeader from "./CommentsHeader";
import TextEditor from "./TextEditor";
import Pusher from "pusher-js";
import ChatApi from "../api/ChatApi";

const Comments = ({ chat, setChat, setShowComments }) => {

  useEffect(() => {
    const pusher = new Pusher("6d32a294e8e6b327e3c5", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("comment");
    
    channel.bind("comment-update", function (data) {
      if(Number(chat?.id) === data.comment.chat_id) {
        ChatApi.showChat(data.comment.chat_id).then(res => {
          setChat(res.data)
        })
      }
    });
  }, [chat, setChat]);
  
  // scroll to the bottom of comments thread
  const scrollToBottom = () => {
    const elem = document.getElementById("commentsWrapper");
    elem.scrollTo({ top: elem.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, chat.comments]);

  const handleClose = () => {
    setShowComments(false);
    setChat(null);
  };

  return (
    <div className="flex">
      <div className="relative flex flex-col border-l-2 w-96 text-gray-800">
        <h1 className="absolute flex items-center justify-between h-14 px-4 top-0 z-50 w-full font-bold text-lg bg-white border-b-2">
          Chat Comments
          <button
            onClick={handleClose}
            className="cursor-pointer p-1.5 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-7"
          >
            x
          </button>
        </h1>

        <div className="flex flex-col justify-even h-full">
          <div id="commentsWrapper" className="flex flex-col mt-14 overflow-y-auto">
            <CommentsHeader chat={chat} />

            <div className="flex my-3 mx-6">
              <div className="mr-2 text-sm text-gray-400">
                {chat?.comments?.length >= 1
                  ? (chat?.comments?.length > 1
                    ? chat?.comments?.length + " replies"
                    : chat?.comments?.length + " reply"
                    )
                  : "No replies"}
              </div>
              <div className="flex-1 h-0.5 my-auto border-b-1 text-center bg-gray-200"></div>
            </div>

            {chat?.comments?.map((comment) => {
              return (
                <div key={comment?.id}>
                  <CommentCard comment={comment} />
                </div>
              );
            })}
          <div className="p-2">
            {/* <CommentTextEditor chatId={chat?.id} /> */}
            <TextEditor type="comment" chat={chat}/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
