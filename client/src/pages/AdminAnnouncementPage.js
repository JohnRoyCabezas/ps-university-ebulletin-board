import { React, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Thread from "../components/Thread";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";


const AdminAnnouncementPage = () => {
  const [isThread, setThread] = useState(false);
  const [announcements, setAnnouncement] = useState([]);
  const params = {
    announcementable_id: 1,
    announcementable_type: "App/Models/University",
  };

  function setThreadValue(value) {
    setThread(value);
  }

  useEffect(() => {
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncement(res.data);
      }
    );
  }, []);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, [announcements]);

  function handleRefresh() {
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncement(res.data);
      }
    );
  }

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">Announcements</h1>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-auto">
            {
              announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id.toString()} userRole={'admin'} announcement={announcement} handleRefresh={() => handleRefresh()} setValue={setThreadValue}/>
              ))}
          </div>
          <div className="px-5">
            <RichTextEditor
              handleRefresh={() => handleRefresh()}
              params={params}
            />
          </div>
        </div>
      </div>
      {isThread && <Thread userRole={'admin'} setValue={setThreadValue}/>}
    </div>
  );
};

export default AdminAnnouncementPage;
