import { faLock, faLockOpen, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { React, useEffect, useState, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";
import ThreadCard from "../components/ThreadCard";
import ThreadApi from "../api/ThreadApi";
import Cookies from "js-cookie";

export default function Thread(props) {
  const [lockLoading, setLockLoading] = useState(false);
  const [announcement, setAnnouncement] = useState();
  const [isAlter, setIsAlter] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(Cookies.get('user'));
  const [isLock, setIsLock] = useState(false);
  const [threads, setThreads] = useState();
  const [params, setParams] = useState();

  useEffect(() => {
    AnnouncementApi.fetchSpecificAnnouncement(props.announcementThread).then(({ data }) => {
      setParams({
        announcementable_id: data.announcementable_id,
        announcementable_type: data.announcementable_type,
        announcement_id: data.id,
        type: "comment"
      })
      ThreadApi.fetchThread(data.id).then(({ data }) => {
        setAnnouncement(data.announcement);
        setIsLock(data.announcement.is_locked)
        setThreads(data.thread);
        setLoading(false);
      })

    });
  }, []);

  function handleRefresh() {
    ThreadApi.fetchThread(props.announcementThread).then(({ data }) => {
      setThreads(data.thread)
      setLoading(false);
    })
  }

  function handleLock(id) {
    setLockLoading(true);
    AnnouncementApi.lockSpecificAnnouncement(id).then(
      () => {
        setLockLoading(false);
        setIsLock(!isLock);
      });
    handleRefresh();
  }

  useLayoutEffect(() => {
    if (!isAlter) {
      const lastDiv = document?.getElementById("threadWrapper");
      lastDiv?.scrollTo(0, lastDiv?.scrollHeight);
      setIsAlter(false);
    }
    setIsAlter(false);
  },
    [threads]
  );

  return !loading && (
    <div className="flex" id="threadHeight">
      <div className="relative flex flex-col border-l-2 w-[30vw]" >
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">
          Thread
          <button
            onClick={() => props.setValue(false)}
            className="cursor-pointer p-1.5 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-7"
          >
            x
          </button>

          {/* Lock button */}
          <span className="mt-0 float-right" hidden={!(props.userRole === "admin")}>
            <button
              className="cursor-pointer"
              onClick={() => handleLock(props.announcementThread)}
            >
              {lockLoading ?
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="lg"
                  color="#162750"
                  spin />
                :
                <FontAwesomeIcon
                  icon={isLock ? faLock : faLockOpen}
                  size="lg"
                  color="#162750"
                />}
            </button>
          </span>
        </h1>

        <div className="flex flex-col justify-even h-full">
          <div
            id="threadWrapper"
            className="mt-12 overflow-y-auto bg-danger"
          >
            <ThreadCard
              thread={announcement}
              user_detail={announcement.user}
              isShown={false}
            />

            <div className="flex">
              <div className="text-sm w-16 ml-2 text-gray-400">
                {threads.length > 1 ? threads.length + " replies" : threads.length + " reply"}
              </div>
              <div className="h-0.5 w-full my-auto flex border-b-1 bg-gray-300 text-center">
              </div>
            </div>
            {
              threads.map((thread) => (
                <ThreadCard
                  key={thread.id.toString()}
                  userRole={user?.role_user?.role_id}
                  thread={thread}
                  user_detail={thread.user}
                  handleRefresh={() => handleRefresh()}
                  isAlter={() => setIsAlter(true)}
                  isShown={true}
                />
              ))
            }
          </div>
          <div className="px-4 mt-2" hidden={isLock || user?.role_user?.role_id === 1}>{
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
