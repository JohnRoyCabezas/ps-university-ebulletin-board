import { React, useEffect, useState } from "react";
import ChatApi from "../api/ChatApi";
import CommentApi from "../api/CommentApi";
import CommentCard from "./CommentCard";
import CommentsHeader from "./CommentsHeader";
import CommentTextEditor from "./CommentTextEditor";
import Pusher from "pusher-js";

const Comments = ({ chat_id, setShowComments }) => {
  const [comments, setComments] = useState([]);
  const [chat, setChat] = useState({});

  useEffect(() => {
    CommentApi.fetchComments(chat_id).then((res) => {
      setComments(res.data);
    });

    ChatApi.showChat(chat_id).then((res) => {
      setChat(res.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("6d32a294e8e6b327e3c5", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("comment");
    channel.bind("comment-update", function (data) {
      CommentApi.fetchComments(chat_id).then((res) => {
        setComments(res.data);
      });
    });
  }, []);

  // scroll to the bottom of comments thread
  useEffect(() => {
    const lastDiv = document.getElementById("commentsWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, [comments]);

  const handleRefresh = () => {
    CommentApi.fetchComments(chat_id).then((res) => {
      setComments(res.data);
    });
  };

  return (
    <div className="flex">
      <div className="relative flex flex-col border-l-2 w-[30vw]">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">
          Chat Comments
          <button
            onClick={() => setShowComments(false)}
            className="cursor-pointer p-1.5 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-7"
          >
            x
          </button>
        </h1>

        <div className="flex flex-col justify-even h-full">
          <div id="commentsWrapper" className="mt-14 overflow-y-auto">
            
            <CommentsHeader chat={chat} />
            
            <div className="flex my-2 mx-5">
              <div className="mr-2 text-sm text-gray-400">
                {comments.length > 1
                  ? comments.length + " replies"
                  : comments.length + " reply"}
              </div>
              <div className="flex-1 h-0.5 my-auto border-b-1 text-center bg-gray-300 "></div>
            </div>

            {comments?.map((comment) => {
              return (
                <div key={comment?.id}>
                  <CommentCard
                    handleRefresh={handleRefresh}
                    comment={comment}
                  />
                </div>
              );
            })}
          </div>
          <div className="px-4 mt-2">
            <CommentTextEditor chatId={chat_id} handleRefresh={handleRefresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
