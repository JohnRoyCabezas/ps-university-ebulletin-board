import { React, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementApi from '../api/AnnouncementApi';

const CollegePage = () => {
  const [announcements, setAnnouncement] = useState([]);

  useEffect(() => {
    const param = {announcementable_type:"App/Models/College"}
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
    <div className="flex">
      <Sidebar />
      <div className="relative flex flex-col w-screen h-screen">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">College</h1>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-scroll scroll">
            {
              announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id.toString()} userRole={'student'} announcement={announcement} />
              ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CollegePage;
