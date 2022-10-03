import { React, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AnnouncementCard from "../components/AnnouncementCard";
import AnnouncementApi from "../api/AnnouncementApi";

const AnnouncementPage = () => {

  const [announcements, setAnnouncement] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    AnnouncementApi.fetchAnnouncement().then(
      (res) => {
        setAnnouncement(res.data);
      },
      (err) => {
        setErrMsg(err.response);
      }
    );
  }, []);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <h1 className="font-bold p-3 text-lg border-b-2">Announcements</h1>
        {
          announcements.map((announcement) => (
            (announcement.announcementable_type === 'App/Models/University') ? <AnnouncementCard key={announcement.id.toString()} announcement={announcement} /> : false
          )
          )}

      </div>
    </div>
  );
};
export default AnnouncementPage;
