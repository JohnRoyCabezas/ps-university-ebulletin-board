import { React, useEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementApi from '../api/AnnouncementApi';
import { useParams } from 'react-router-dom';

const CollegePage = () => {
  const {id} = useParams();
  const [announcements, setAnnouncement] = useState([]);

  useEffect(() => {
    const params = {
      announcementable_type: 'App/Models/College',
      announcementable_id: id,
    };
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncement(res.data);
    });
  }, []);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight)
  }, [announcements])

  return (
    <div className="flex">
      <div className="relative flex flex-col w-full h-screen">
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
