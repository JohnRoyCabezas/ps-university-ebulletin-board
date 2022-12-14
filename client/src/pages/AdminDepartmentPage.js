import { React, useEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import RichTextEditor from '../components/RichTextEditor';
import Thread from "../components/Thread";
import AnnouncementApi from '../api/AnnouncementApi';
import DepartmentApi from '../api/DepartmentApi';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';

const AdminDepartment = () => {
  const { departmentid } = useParams();
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState()
  const [announcements, setAnnouncements] = useState([]);
  const [department, setDepartment] = useState()
  const params =
  {
    announcementable_id: departmentid,
    announcementable_type: "App/Models/Department",
  }

  function setThreadValue(value) {
    setThread(value);
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
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncements(res.data);
      }
    );
    DepartmentApi.fetchSpecificDepartment(departmentid).then(
      ({data})  => {
        setDepartment(data)
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
        setAnnouncements(res.data);
      }
    );
  }
  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">{department?.department} Announcements</h1>
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
          <div className="p-2 rounded-3xl">
            <RichTextEditor handleRefresh={() => handleRefresh()} params={params} />
          </div>
        </div>
      </div>
      {isThread && <Thread userRole={'student'} setValue={setThreadValue} announcementThread={announcementThread}/>}
    </div>
  );
};

export default AdminDepartment;
