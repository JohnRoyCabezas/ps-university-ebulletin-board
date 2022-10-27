import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseApi from '../api/CourseApi';
import ChatApi from '../api/ChatApi';
import ChatCard from '../components/ChatCard';
import ChatTextEditor from '../components/ChatTextEditor';

const ClassPage = () => {
  const { classid } = useParams();
  const [chats, setChats] = useState([]);
  const [course, setCourse] = useState({});

  useEffect(() => {
    CourseApi.fetchSpecificCourse(classid).then((res) => {
      setCourse(res.data);
    });
    ChatApi.fetchCourseChats(classid).then((res) => {
      setChats(res.data);
    });
  }, [classid]);

  useEffect(() => {
    const lastDiv = document.getElementById('chatswrapper');
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, [chats]);

  const handleRefresh = () => {
    ChatApi.fetchCourseChats(classid).then((res) => {
      setChats(res.data);
    });
  }

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">
          {course?.course}
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div id="chatswrapper" className="mt-12 overflow-y-auto">
            {chats.length == 0 ? (
              <div className="flex mt-10 italic justify-center">
                There are no chat messages available.
              </div>
            )
          :
          chats?.map((chat) => (
            <div key={chat?.id}>
              <ChatCard chatid={chat?.id} chat={chat} handleRefresh={handleRefresh} />
            </div>
          ))
          }
          </div>
          <div className="p-2 rounded-3xl">
            <ChatTextEditor handleRefresh={handleRefresh} classid={classid} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
