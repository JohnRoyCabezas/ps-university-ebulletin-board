import { React, useEffect, useLayoutEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import RichTextEditor from '../components/RichTextEditor';
import AnnouncementApi from '../api/AnnouncementApi';
import { useParams, useNavigate } from 'react-router-dom';
import Thread from '../components/Thread';
import Pusher from 'pusher-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenSquare
} from '@fortawesome/free-solid-svg-icons';

const AdminCollegePage = () => {
  const navigate = useNavigate();
  const { collegeid } = useParams();
  const [isThread, setThread] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementThread, setAnnouncementThread] = useState()
  const [isAlter, setIsAlter] = useState(false);
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
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncements(res.data);
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
        setAnnouncements(res.data);
      }
    );
  }

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <div className="absolute flex top-0 z-10 w-full font-bold p-3 text-lg bg-white border-b-2 justify-between">
          <div>
            Announcements
          </div>
          <button
            type="button"
            className="p-2 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => { navigate('/editcollege', { state: { collegeid: collegeid } }) }}
          >

            <FontAwesomeIcon icon={faPenSquare} className="mr-1" size='xl' /> Edit College
          </button>

        </div>
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
                  threadOpen={isThread}
                />
              ))}
          </div>
          <div className="p-2">
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
