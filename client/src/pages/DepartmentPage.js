import { React, useContext, useEffect, useLayoutEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import Thread from "../components/Thread";
import AnnouncementApi from '../api/AnnouncementApi';
import DepartmentApi from '../api/DepartmentApi';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import RichTextEditor from '../components/RichTextEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../utils/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';


const DepartmentPage = () => {
  const { departmentid } = useParams();
  const [isThread, setThread] = useState(false);
  const [department, setDepartment] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [announcementThread, setAnnouncementThread] = useState();
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const params =
  {
    announcementable_id: departmentid,
    announcementable_type: "App/Models/Department",
  }

    // Initial Load
    useEffect(() => {
      setLoading(true);
  
      const fetchData = async() => {
        const announcements = await AnnouncementApi.fetchChannelAnnouncements(params);
        const department = await DepartmentApi.fetchSpecificDepartment(departmentid);
  
        setAnnouncements(announcements.data);
        setDepartment(department.data);
        setLoading(false);
      }
  
      fetchData();
    }, [departmentid]);

  //Pusher Update
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

  function setThreadValue(value) {
    setThread(value);
  }

  // Scroll effect 
  useLayoutEffect(() => {
      const lastDiv = document?.getElementById("announcementWrapper");
      lastDiv?.scrollHeight*.90 < lastDiv?.scrollTop+1000 || lastDiv?.scrollTop == 0 ?
      lastDiv?.scrollTo({top: lastDiv?.scrollHeight+1000, behavior:'smooth'})
      :
      lastDiv?.scrollTo({top: lastDiv?.scrollTop, behavior:'smooth'})
  }, [announcements]);

  return loading ? (
      <LoadingSpinner />
    ) : (
    <div className="flex w-full h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute top-0 z-40 w-full font-bold p-3 h-14 text-lg bg-white border-b-2">
        <div className="truncate">
            <FontAwesomeIcon icon={faBuilding} className="mr-2" />
            {department?.department}
          </div>
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div id='announcementWrapper' className="mt-14 overflow-y-auto">
            {
              announcements.map((announcement) => (
                <AnnouncementCard
                    key={announcement.id.toString()}
                    userRole={'student'}
                    announcement={announcement}
                    setValue={setThreadValue}
                    setAnnouncementThread={setAnnouncementThread}
                    threadOpen = {isThread}
                />
              ))}
          </div>
          {
          (user?.role_user?.role_id === 1 ? '' : <div className="p-2 rounded-3xl">
          <RichTextEditor
            params={params}
          />
        </div>)
}
        </div>
      </div>
      {isThread && <Thread userRole={'student'} setValue={setThreadValue} announcementThread={announcementThread}/>}
    </div>
  );
};

export default DepartmentPage;
