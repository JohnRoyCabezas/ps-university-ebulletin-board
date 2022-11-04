import { React, useEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementApi from '../api/AnnouncementApi';
import Thread from '../components/Thread';
import Cookies from 'js-cookie';

const AnnouncementPage = () => {
  const [announcements, setAnnouncement] = useState([]);
  const [announcementThread, setAnnouncementThread] = useState()
  const [isThread, setThread] = useState(false);
  const user = JSON.parse(Cookies.get('user'));

  function setThreadValue(value) {
    setThread(value);
  }

  useEffect(() => {
    const params = {
      announcementable_id: 1,
      announcementable_type: "App/Models/University"
    }

    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncement(res.data);
        console.log(user?.role_user?.role_id);
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
        <div className="absolute top-0 z-50 w-full font-bold flex justify-between p-3 text-2xl bg-white border-b-2">
          {/* <span className="text-lg">{hr > 5 && hr < 20 ? "🌞" : "🌙"} {time.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</span> */}
          <h1> Announcements</h1>
          {/* <span className="botton-0 mr-6 text-sm font-normal">📆 <span className="italic">{time.toLocaleString([], {month: 'long', day: '2-digit'})}, {time.getFullYear()}</span></span> */}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-auto">
            {
              announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id.toString()}
                  userRole={'student'}
                  announcement={announcement}
                  setValue={setThreadValue}
                  setAnnouncementThread={setAnnouncementThread} />
              ))}
          </div>
        </div>
      </div>
      {isThread && <Thread userRole={'student'} setValue={setThreadValue} announcementThread={announcementThread} />}
    </div>
  );
};

export default AnnouncementPage;
