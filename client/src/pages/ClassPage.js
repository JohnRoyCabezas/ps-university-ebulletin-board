import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';
import CourseApi from '../api/CourseApi';
import ChatApi from '../api/ChatApi';
import ChatCard from '../components/ChatCard';
import ChatTextEditor from '../components/ChatTextEditor';
import Comments from '../components/Comments';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const ClassPage = () => {
  const { classid } = useParams();
  const [chats, setChats] = useState([]);
  const [course, setCourse] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [chatId, setChatId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRefresh = () => {
    ChatApi.fetchCourseChats(classid).then(res => {
      setChats(res.data); 
    })
  };

  useEffect(() => {
    CourseApi.fetchSpecificCourse(classid).then((res) => {
      setCourse(res.data);
      setLoading(false);
    });

    handleRefresh();
  }, [classid]);

  
  useEffect(() => {
    const pusher = new Pusher('6d32a294e8e6b327e3c5', {
      cluster: 'ap1',
    });
    
    const channel = pusher.subscribe('chat');
  
    channel.bind('chat-update', function (data) {
      handleRefresh();
    });
  }, []);
  
  useEffect(() => {
    const lastDiv = document.getElementById('chatswrapper');
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, [chats]);

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">
          {course?.course}
          <button
              type="button"
              className="p-2 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={()=> navigate(`/editclass/${classid}`)}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
              Edit
          </button>
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div id="chatswrapper" className="mt-12 overflow-y-auto">
            {chats?.length === 0 ? (
              <div className="flex mt-10 italic justify-center">
                {!loading ? "There are no chat messages available.": "Loading..."}
              </div>
            ) : (
              chats?.map((chat) => (
                <ChatCard
                  key={chat?.id}
                  chat={chat}
                  handleRefresh={handleRefresh}
                  setShowComments={setShowComments}
                  setChatId={setChatId}
                  showComments = {showComments}
                />
              ))
            )}
          </div>
          <div className="p-2 rounded-3xl">
            <ChatTextEditor handleRefresh={handleRefresh} classid={classid} setIsEditing={setIsEditing}/>
          </div>
        </div>
      </div>
      {showComments && (
        <Comments setShowComments={setShowComments} chat_id={chatId} />
      )}
    </div>
  );
};

export default ClassPage;
