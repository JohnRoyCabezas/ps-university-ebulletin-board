import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLock, 
  faLockOpen, 
  faSpinner
} from "@fortawesome/free-solid-svg-icons"
import ThreadCard from "../components/ThreadCard";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";

export default function Thread(props) {
  const [announcements, setAnnouncement] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lockLoading, setLockLoading] = useState(false);
  const threads = [
    {id: 1, user_id: 1, announcement_id: 1, thread_message: "test message"},
    {id: 2, user_id: 1, announcement_id: 2, thread_message: "test2 message"},
    {id: 3, user_id: 1, announcement_id: 1, thread_message: "test3 message"}
  ]
  const params = {
    announcementable_id: 1,
    announcementable_type: "App/Models/University",
  };

  useEffect(() => {
    AnnouncementApi.fetchSpecificAnnouncement(props.announcementThread).then(({data}) => {
      setAnnouncement(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, [announcements]);

  function handleRefresh() {
    AnnouncementApi.fetchSpecificAnnouncement(props.announcementThread).then(({data}) => {
      setAnnouncement(data);
      setLoading(false);
    });
  }

  function buttonHandler() {
    props.setValue(false);
  }

  function handleLock(id) {
    setLockLoading(true);
    AnnouncementApi.lockSpecificAnnouncement(id).finally(
      () => {
        setLockLoading(false)
      });
    handleRefresh();
  }

  return !loading && (
    <div className="flex">
      <div className="relative flex flex-col border-l-2 w-[30vw]">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">
          Thread
          <button
            onClick={buttonHandler}
            className="cursor-pointer p-1.5 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            X
          </button>
          
          {/* Lock button */}
          <span className="mt-0 float-right" hidden={!(props.userRole==="admin")}>
            <button
              className="cursor-pointer"
              onClick={() => handleLock(props.announcementThread)}
            >
              <FontAwesomeIcon icon={!lockLoading ? (announcements.is_locked ? faLock: faLockOpen) : faSpinner} size="lg" color="#162750" />
            </button>
          </span>
        </h1>
          
        <div className="flex flex-col justify-between h-full">
          <div
            id="announcementWrapper"
            className="mt-12 overflow-y-scroll scroll"
          >
            {threads.map((thread) => (
              <ThreadCard
                key={thread.id.toString()}
                userRole={"admin"}
                thread={thread}
                handleRefresh={() => handleRefresh()}
              />
            ))}
          </div>
          <div className="px-5" hidden={announcements.is_locked}>{
            <RichTextEditor
                handleRefresh={() => handleRefresh()}
                params={params}
            />
          }
          </div>
        </div>
      </div>
    </div>
  );
}
