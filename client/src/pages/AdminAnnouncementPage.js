import { React, useEffect, useState } from "react";
import Thread from "../components/Thread";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";


const AdminAnnouncementPage = () => {
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState()
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
        <div className="absolute top-0 z-50 w-full font-bold flex justify-between p-3 text-2xl bg-white border-b-2">
          {/* <span className="text-lg">{time.getHours() > 5 && time.getHours() < 20 ? "🌞" : "🌙"} {time.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</span> */}
          <h1> Announcements</h1>
          {/* <span className="botton-0 mr-6 text-sm font-normal">📆 <span className="italic">{time.toLocaleString([], {month: 'long', day: '2-digit'})}, {time.getFullYear()}</span></span> */}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-auto bg-danger">
            {
              announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id.toString()}
                  userRole={'admin'}
                  announcement={announcement}
                  handleRefresh={() => handleRefresh()}
                  setValue={setThreadValue}
                  setAnnouncementThread={setAnnouncementThread}
                />
              ))}
          </div>
          <div className="p-2 rounded-3xl">
            <RichTextEditor
              handleRefresh={() => handleRefresh()}
              params={params}
            />
          </div>
        </div>
      </div>
      {isThread && <Thread userRole={'admin'} setValue={setThreadValue} announcementThread={announcementThread}/>}
    </div>
  );
};

export default AdminAnnouncementPage;
