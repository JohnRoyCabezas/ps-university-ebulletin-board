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
import ThreadApi from "../api/ThreadApi";

export default function Thread(props) {
  const [announcements, setAnnouncements] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lockLoading, setLockLoading] = useState(false);
  const [threads, setThreads] = useState();
  const [announcement, setAnnouncement] = useState();
  const [params, setParams] = useState();

  useEffect(() => {
    AnnouncementApi.fetchSpecificAnnouncement(props.announcementThread).then(({data}) => {
      setAnnouncements(data);
      setParams({
        announcementable_id: data.announcementable_id,
        announcementable_type: data.announcementable_type,
        announcement_id: data.id,
        type: "comment"
      })
      ThreadApi.fetchThread(data.id).then(({data})=> {
        setAnnouncement(data.announcement)
        setThreads(data.thread)
        setLoading(false);
      })

    });
  }, []);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, [announcements]);

  function handleRefresh() {
    ThreadApi.fetchThread(props.announcementThread).then(({data})=> {
      setAnnouncement(data.announcement)
      setThreads(data.thread)
      setLoading(false);
    })
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
            className="cursor-pointer p-1.5 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-7"
          >
            x
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
            <ThreadCard
                thread={announcement}
                user_detail={announcement.user}
              />
            {threads.map((thread) => (
              <ThreadCard
                key={thread.id.toString()}
                userRole={"admin"}
                thread={thread}
                user_detail={thread.user}
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
