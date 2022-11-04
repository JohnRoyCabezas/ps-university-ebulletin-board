import { React, useEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementApi from '../api/AnnouncementApi';
import Thread from '../components/Thread';
import Cookies from 'js-cookie';

const AnnouncementPage = () => {
  const university_id = Cookies.get('universityid');
  const [announcements, setAnnouncement] = useState([]);
  const [announcementThread, setAnnouncementThread] = useState()
  const [isThread, setThread] = useState(false);
  const user = JSON.parse(Cookies.get('user'));
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
      announcementable_id: university_id,
      announcementable_type: "App/Models/University",
    }
  );

  function setThreadValue(value) {
    setThread(value);
  }

  useEffect(()=> {
    setParams({
      ...params,
      announcementable_id: university_id,
    })
  }, [university_id]);
  
  useEffect(() => {
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncement(res.data);
        setLoading(false)
      }
    );
  }, [params]);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv?.scrollTo(0, lastDiv.scrollHeight)
  }, [announcements])

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
      <div className="absolute top-0 z-50 w-full font-bold flex justify-between p-3 text-2xl bg-white border-b-2">
          <h1> Announcements</h1>
        </div>
        {!loading ? (

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
        ) : (
          <div className="mt-12 flex justify-center align-items">
            <h1 className="flex justify-between font-bold p-3 sticky top-0 bg-white text-xl">Loading...</h1>
            </div>
        )}
      </div>
      {isThread && <Thread userRole={'student'} setValue={setThreadValue} announcementThread={announcementThread} />}
    </div>
  );
};

export default AnnouncementPage;
