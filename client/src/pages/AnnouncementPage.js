import { React, useEffect, useState, useLayoutEffect, useContext } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import AnnouncementApi from "../api/AnnouncementApi";
import Thread from "../components/Thread";
import Pusher from "pusher-js";
import { UserContext } from "../utils/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementThread, setAnnouncementThread] = useState();
  const [isThread, setThread] = useState(false);
  const [isAlter, setIsAlter] = useState(false);
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const params = {
    announcementable_id: user.university_id,
    announcementable_type: "App/Models/University",
  };

  function setThreadValue(value) {
    setThread(value);
  }

  // Initial load
  useEffect(() => {
    setLoading(true);
    
    const fetchData = async() => {
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
    lastDiv?.scrollHeight*.90 < lastDiv?.scrollTop+1000 || lastDiv?.scrollTop == 0 ?
    lastDiv?.scrollTo({top: lastDiv?.scrollHeight+1000, behavior:'smooth'})
    :
    console.log('')
}, [announcements]);

  return loading ? (
      <LoadingSpinner />
    ) : (
    <div className="flex w-full h-screen">
      <div className="relative flex flex-col w-full">
        <div className={`absolute top-0 z-30 w-full h-14 font-bold flex justify-between p-2 bg-white bg-opacity-10 font-weight-bold border-b-2`}>
          {/* <span className="text-lg">{4 > 5 && 21 < 20 ? "🌞" : "🌙"} {time.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</span> */}
          <h1> Announcements</h1>
          {/* <span className="botton-0 mr-6 text-sm font-normal">📆 <span className="italic">{time.toLocaleString([], {month: 'long', day: '2-digit'})}, {time.getFullYear()}</span></span> */}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div id="announcementWrapper" className="mt-12 overflow-y-auto">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id.toString()}
                userRole={"student"}
                announcement={announcement}
                setValue={setThreadValue}
                setAnnouncementThread={setAnnouncementThread}
                threadOpen={isThread}
                isAlter={() => setIsAlter(true)}
              />
            ))}
          </div>
        </div>
      </div>
      {isThread && (
        <Thread
          userRole={"student"}
          setValue={setThreadValue}
          announcementThread={announcementThread}
        />
      )}
    </div>
  );
};

export default AnnouncementPage;
