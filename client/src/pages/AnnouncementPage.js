import { React, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementApi from '../api/AnnouncementApi';

const AdminAnnouncementPage = () => {
  const [announcements, setAnnouncement] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    AnnouncementApi.fetchAnnouncement().then(
      (res) => {
        setAnnouncement(res.data.filter(item => item.announcementable_type === "App/Models/University"));
      },
      (err) => {
        setErrMsg(err.response);
      }
    );
  }, []);

  console.log(announcements[0])
  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight)
  }, [announcements])

  function handleClick() {
    AnnouncementApi.fetchAnnouncement().then(
      (res) => {
        setAnnouncement(res.data.filter(item => item.announcementable_type === "App/Models/University"));
      },
      (err) => {
        setErrMsg(err.response);
      }
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="relative flex flex-col w-screen h-screen">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">Announcements</h1>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-scroll scroll">
            {
              announcements.map((announcement, id) => (
                <AnnouncementCard key={announcement.id.toString()} id={(id)} announcement={announcement} />
              ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminAnnouncementPage;
