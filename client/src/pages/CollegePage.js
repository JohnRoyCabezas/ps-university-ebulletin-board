import { React, useEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import AnnouncementApi from '../api/AnnouncementApi';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';

const CollegePage = () => {
  const {collegeid} = useParams();
  const [announcements, setAnnouncements] = useState([]);
  const params =
  {
    announcementable_id: collegeid,
    announcementable_type: "App/Models/College",
  }

  useEffect(() => {
    const pusher = new Pusher('6d32a294e8e6b327e3c5', {
      cluster: 'ap1',
    });

    const channel = pusher.subscribe('announcement-channel');
    channel.bind('announcement-update', function (data) {
      AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
        setAnnouncements(res.data);
      });
    });
  }, []);

  useEffect(() => {
    const params = {
      announcementable_type: 'App/Models/College',
      announcementable_id: collegeid,
    };
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncements(res.data);
    });
  }, [collegeid]);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight)
  }, [announcements])

  return (
    <div className="flex">
      <div className="relative flex flex-col w-full h-screen">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">College</h1>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-auto">
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
