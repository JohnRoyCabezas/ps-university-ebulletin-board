import { React, useEffect, useLayoutEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import RichTextEditor from '../components/RichTextEditor';
import AnnouncementApi from '../api/AnnouncementApi';
import CollegeApi from '../api/CollegeApi';
import { useParams, useNavigate } from 'react-router-dom';
import Thread from '../components/Thread';
import Pusher from 'pusher-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingColumns,
  faPenSquare
} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminCollegePage = () => {
  const navigate = useNavigate();
  const { collegeid } = useParams();
  const [isThread, setThread] = useState(false);
  const [announcements, setAnnouncements] = useState({});
  const [announcementThread, setAnnouncementThread] = useState()
  const [college, setCollege] = useState();
  const [loading, setLoading] = useState(true);
  const [initScroll, setInitScroll] = useState(false);
  const params =
  {
    announcementable_id: collegeid,
    announcementable_type: "App/Models/College",
  }

  // Initial load
  useEffect(() => {
    setLoading(true);
    
    const fetchData = async() => {
      const announcement = await AnnouncementApi.fetchChannelAnnouncements(params);
      const college = await CollegeApi.fetchSpecificCollege(collegeid);

      setAnnouncements(announcement.data)
      setCollege(college.data);
      setLoading(false);
    }
    fetchData();
  }, [collegeid]);
  
  // Pusher update
  useEffect(() => {
    const pusher = new Pusher('6d32a294e8e6b327e3c5', {
      cluster: 'ap1',
    });

    const channel = pusher.subscribe('announcement-channel');
    channel.bind('announcement-update',
      function (data) {
        AnnouncementApi.fetchChannelAnnouncements(data?.announcement).then(
          (res) => {
            setAnnouncements(res?.data);
          }
        );
      });
  }, []);

  // Scroll effect
  useLayoutEffect(() => {
      const lastDiv = document?.getElementById("announcementWrapper");
      lastDiv?.scrollHeight*.90 < lastDiv?.scrollTop+1000 || lastDiv?.scrollTop == 0 ?
      lastDiv?.scrollTo({top: lastDiv?.scrollHeight+1000, behavior:'smooth'})
      :
      console.log('')
  }, [announcements]);

  return loading ? (
      <LoadingSpinner />
    ) : (
    <div className="flex w-full h-screen">
      <div className="relative flex flex-col w-full text-gray-800">
        <h1 className="absolute flex items-center justify-between h-14 px-4 top-0 z-10 w-full font-bold text-lg bg-white border-b">
          <div className="truncate">
            <FontAwesomeIcon icon={faBuildingColumns} className="mr-2" />
            {college?.college?.college}
          </div>
          <button
            type="button"
            className="p-2 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {
              navigate("/editcollege", { state: { collegeid: collegeid } });
            }}
          >
            <FontAwesomeIcon icon={faPenSquare} className="mr-1" size="xl" />{" "}
            Edit College
          </button>
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div id="announcementWrapper" className="mt-12 overflow-y-auto">
            {announcements?.map((announcement) => (
              <AnnouncementCard
                key={announcement.id.toString()}
                userRole={"admin"}
                announcement={announcement}
                setValue={(value) => setThread(value)}
                setAnnouncementThread={setAnnouncementThread}
                threadOpen={isThread}
              />
            ))}
          </div>
          <div className="p-2">
            <RichTextEditor
              params={params}
            />
          </div>
        </div>
      </div>
      {isThread && (
        <Thread
          userRole={"admin"}
          setValue={(value) => setThread(value)}
          announcementThread={announcementThread}
        />
      )}
    </div>
  );
};

export default AdminCollegePage;
