import { React, useContext, useEffect, useLayoutEffect, useState } from "react";
import Thread from "../components/Thread";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";
import Pusher from "pusher-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../utils/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminAnnouncementPage = () => {
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState();
  const [announcements, setAnnouncements] = useState(null);
  const { user } = useContext(UserContext);
  const [isAlter, setIsAlter] = useState(false);
  const params = {
    announcementable_id: user.university_id,
    announcementable_type: "App/Models/University",
  };
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const announcement = await AnnouncementApi.fetchChannelAnnouncements(params);
      setAnnouncements(announcement.data)
      setLoading(false);
    }
    fetchData();
  }, []);

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
    lastDiv?.scrollHeight * .90 < lastDiv?.scrollTop + 1000 || lastDiv?.scrollTop == 0 ?
      lastDiv?.scrollTo({ top: lastDiv?.scrollHeight + 1000, behavior: 'smooth' })
      :
      console.log('')
  }, [announcements]);

  function setThreadValue(value) {
    setThread(value);
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex w-full h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute flex items-center text-gray-800 justify-between h-14 px-4 top-0 z-10 w-full font-bold text-lg bg-white border-b">
          <div className="truncate">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            University Announcements
          </div>
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div
            id="announcementWrapper"
            className="mt-12 overflow-y-auto"
          >
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id.toString()}
                userRole={"admin"}
                announcement={announcement}
                setValue={setThreadValue}
                setAnnouncementThread={setAnnouncementThread}
                isAlter={() => setIsAlter(true)}
                threadOpen={isThread}
              />
            ))}
          </div>
          <div className="p-2 rounded-3xl">
            <RichTextEditor
              params={params}
            />
          </div>
        </div>
      </div>
      {isThread && (
        <Thread
          userRole={"admin"}
          setValue={setThreadValue}
          announcementThread={announcementThread}
        />
      )}
    </div>
  );
};

export default AdminAnnouncementPage;
