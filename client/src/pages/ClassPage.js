import { React, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Pusher from "pusher-js";
import CourseApi from "../api/CourseApi";
import ChatApi from "../api/ChatApi";
import ChatCard from "../components/ChatCard";
import ChatTextEditor from "../components/ChatTextEditor";
import Comments from "../components/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import {UserContext} from "../utils/UserContext"

const ClassPage = () => {
  const { classid } = useParams();

  const [chatObj, setChatObj] = useState({});
  const [chats, setChats] = useState([]);
  const [course, setCourse] = useState({});

  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = useContext(UserContext).user.role_user.role_id;

  const fetchCourseChats = (id) => {
    ChatApi.fetchCourseChats(id).then((res) => {
      setChats(res.data);
    });
  };

  useEffect(() => {
    CourseApi.fetchSpecificCourse(classid).then((res) => {
      setCourse(res.data);
      setLoading(false);
    });
    fetchCourseChats(classid);
  }, [classid]);

  useEffect(() => {
    const pusher = new Pusher("6d32a294e8e6b327e3c5", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("chat-update", function (data) {
      // if(Number(classid) === data.chat.course_id) {
        ChatApi.fetchCourseChats(data.chat.course_id).then(res => {
          setChats(res.data)
        })
      // }
    });
  }, [classid, setChats]);

  const scrollToBottom = () => {
    const elem = document.getElementById("chatsWrapper");
    elem.scrollTo({ top: elem.scrollHeight, behavior: "smooth" });
  };

  // bugfix: only run this on first render and on new ChatMessage
  // bugfix: should not be called if there is a new comment
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="flex w-full h-screen">
      <div className="relative flex flex-col w-full text-gray-800">
        <h1 className="absolute flex items-center justify-between h-14 px-4 top-0 z-10 w-full font-bold text-lg bg-white border-b">
          <div className="truncate">
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            {course?.course}
          </div>
          {role === 2 && !loading && (
            <button
              type="button"
              className="p-2 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => navigate(`/editclass/${classid}`)}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
              Edit
            </button>
          )}
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div id="chatsWrapper" className="mt-14 pt-6 overflow-y-auto">
            {chats?.length === 0 ? (
              <div className="flex mt-10 italic justify-center">
                {!loading
                  ? "There are no chat messages available."
                  : "Loading..."}
              </div>
            ) : (
              chats?.map((chat) => (
                <ChatCard
                  key={chat?.id}
                  chat={chat}
                  chatObj={chatObj}
                  setChatObj={setChatObj}
                  setShowComments={setShowComments}
                />
              ))
            )}
          </div>
          <div className="p-2">
            <ChatTextEditor
              classid={classid}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        </div>
      </div>
      {showComments && (
        <Comments
          chat={chatObj}
          setChat={setChatObj}
          setShowComments={setShowComments}
        />
      )}
    </div>
  );
};

export default ClassPage;
