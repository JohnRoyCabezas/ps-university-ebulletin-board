import { React, useEffect, useLayoutEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import RichTextEditor from '../components/RichTextEditor';
import AnnouncementApi from '../api/AnnouncementApi';
import { useParams } from 'react-router-dom';
import Thread from '../components/Thread';

const AdminCollegePage = () => {
  const { collegeid } = useParams();
  const [isThread, setThread] = useState(false);
  const [announcements, setAnnouncement] = useState([]);
  const [announcementThread, setAnnouncementThread] = useState()
  const [isAlter, setIsAlter] = useState(false);
  const params =
  {
    announcementable_id: collegeid,
    announcementable_type: "App/Models/College",
  }

  useEffect(() => {
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncement(res.data);
      }
    );
  }, [collegeid]);

  useLayoutEffect(() => {
    if (!isAlter) {
      const lastDiv = document?.getElementById("announcementWrapper");
      lastDiv?.scrollTo(0, lastDiv?.scrollHeight);
      setIsAlter(false);
    }
    setIsAlter(false);
  },
    [announcements]
  );

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
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">College Announcements</h1>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-auto">
            {
              announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id.toString()}
                  userRole={'admin'}
                  announcement={announcement}
                  handleRefresh={() => handleRefresh()}
                  setValue={(value) => setThread(value)}
                  setAnnouncementThread={setAnnouncementThread}
                  isAlter={() => setIsAlter(true)}
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
      {isThread &&
        <Thread
          userRole={'admin'}
          setValue={(value) => setThread(value)}
          announcementThread={announcementThread}
        />}
    </div>
  );
};

export default AdminCollegePage;
