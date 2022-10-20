import { React, useEffect, useState } from "react";
import ThreadCard from "../components/ThreadCard";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";

export default function Thread(props) {
  const [announcements, setAnnouncement] = useState(false);
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
    AnnouncementApi.fetchAnnouncement().then((res) => {
      setAnnouncement(
        res.data.filter(
          (item) => item.announcementable_type === "App/Models/University"
        )
      );
    });
  }, []);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, [announcements]);

  function handleRefresh() {
    AnnouncementApi.fetchAnnouncement().then((res) => {
      setAnnouncement(
        res.data.filter(
          (item) => item.announcementable_type === "App/Models/University"
        )
      );
    });
  }

  function buttonHandler() {
    props.setValue(false);
  }

  return (
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
          <div className="px-5">
            {props.userRole === "admin" && (
              <RichTextEditor
                handleRefresh={() => handleRefresh()}
                params={params}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
