import { React, useEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import RichTextEditor from '../components/RichTextEditor';
import Thread from "../components/Thread";
import AnnouncementApi from '../api/AnnouncementApi';
import { useParams } from 'react-router-dom';

const DepartmentPage = () => {
  const { departmentid } = useParams();
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState()
  const [announcements, setAnnouncement] = useState([]);
  const params =
  {
    announcementable_id: departmentid,
    announcementable_type: "App/Models/Department",
  }

  function setThreadValue(value) {
    setThread(value);
  }

  useEffect(() => {
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncement(res.data);
      }
    );
  }, [departmentid]);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight)
  }, [announcements])

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
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">Department Announcements</h1>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-12 overflow-y-auto">
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
        </div>
      </div>
      {isThread && <Thread userRole={'student'} setValue={setThreadValue} announcementThread={announcementThread}/>}
    </div>
  );
};

export default DepartmentPage;
