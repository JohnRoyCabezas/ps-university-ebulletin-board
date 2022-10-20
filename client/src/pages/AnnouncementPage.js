import { React, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementApi from '../api/AnnouncementApi';
import Thread from '../components/Thread';

const AnnouncementPage = () => {
  const [announcements, setAnnouncement] = useState([]);
  const [isThread, setThread] = useState(false);

  function setThreadValue(value) {
    setThread(value);
  }


  useEffect(() => {
    const param = {announcementable_type:"App/Models/University"}
    AnnouncementApi.fetchAnnouncement(param.announcementable_type).then(
      (res) => {
        setAnnouncement(res.data);
      }
    );
  }, []);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight)
  }, [announcements])

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">Announcements</h1>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-auto">
            {
              announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id.toString()} userRole={'student'} announcement={announcement} setValue={setThreadValue}/>
              ))}
          </div>
        </div>
      </div>
      {isThread && <Thread userRole={'student'} setValue={setThreadValue}/>}
    </div>
  );
};

export default AnnouncementPage;
