import { React, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeContext";
import Pusher from "pusher-js";
import CourseApi from "../api/CourseApi";
import ChatApi from "../api/ChatApi";
import ChatCard from "../components/ChatCard";
import ChatTextEditor from "../components/ChatTextEditor";
import Comments from "../components/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import {UserContext} from "../utils/UserContext";
import { ClassListModal2 } from "../components/ClassListModal2";

const ClassPage = () => {
  const { classid } = useParams();
  const [chatObj, setChatObj] = useState({});
  const [chats, setChats] = useState([]);
  const [course, setCourse] = useState({});
  const { user } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="flex w-full h-screen">
      <div className="relative flex flex-col w-full">
        {showModal && (
          <ClassListModal2
            courseTitle={course?.course}
            courseInformation={course?.class_information}
            instructor={course?.instructor.user}
            students={course?.students}
            showModal={() => setShowModal(false)}
          />)
        }
        <h1 className="absolute flex items-center justify-between h-14 px-4 top-0 z-10 w-full font-bold text-lg bg-white border-b-2">
          <div className="flex">
            <div><FontAwesomeIcon icon={faBook} className="mr-2" />{course?.course}</div>
            {role === 2 && !loading &&
              <button
                type="button"
                className={`p-2 ml-4 ${user.theme} float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-opacity-70 hover:shadow-lg focus:bg-opacity-90 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-opacity-90 active:shadow-lg transition duration-150 ease-in-out`}
                onClick={() => navigate(`/editclass/${classid}`)}
              >
                <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                Edit
              </button>
            }
          </div>
          <button
            className={`border ${user.theme} border-gray-400 px-1 py-1 bg-opacity-10 hover:bg-opacity-20 rounded-md flex`}
            onClick={() => setShowModal(!showModal)}
          >
            <div className={`flex my-auto`}>
              {course?.students?.map((student, index) => (
                index < 3  ? <img
                  onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
                  src={student?.user?.avatar}
                  className={`rounded-md w-6 h-6 z-30 -translate-x-${index} border-gray-300`}
                /> : ''
              ))}
            </div>
            <span className="text-lg font-medium text-black px-2">{course?.students?.length}</span>
          </button>
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
