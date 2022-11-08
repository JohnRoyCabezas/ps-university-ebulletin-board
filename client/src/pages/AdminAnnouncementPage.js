import { React, useEffect, useLayoutEffect, useState } from "react";
import Thread from "../components/Thread";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

const AdminAnnouncementPage = () => {
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState();
  const [announcements, setAnnouncements] = useState([]);
  const user = JSON.parse(Cookies.get("universityid"));
  const [isAlter, setIsAlter] = useState(false);
  const params = {
    announcementable_id: user,
    announcementable_type: "App/Models/University",
  };

  // const today = new Date();
  // const [time, setTime] = useState(today);

  // useEffect(() => {
  //     setTime(today);
  // }, [today])

  useEffect(() => {
    const pusher = new Pusher("6d32a294e8e6b327e3c5", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("announcement-channel");
    channel.bind("announcement-update", function (data) {
      AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
        setAnnouncements(res.data);
      });
    });
  }, []);

  function handleRefresh() {
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncements(res.data);
    });
  }

  function setThreadValue(value) {
    setThread(value);
  }

  useEffect(() => {
    handleRefresh();
  }, []);

  useLayoutEffect(() => {
    if (!isAlter) {
      const lastDiv = document?.getElementById("announcementWrapper");
      lastDiv?.scrollTo(0, lastDiv?.scrollHeight);
      setIsAlter(false);
    }
    setIsAlter(false);
  }, [announcements]);

  function handleRefresh() {
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncement(res.data);
    });
  }

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <div className="absolute top-0 z-50 w-full font-bold flex justify-between p-3 text-2xl bg-white border-b-2">
          {/* <span className="text-lg">{time.getHours() > 5 && time.getHours() < 20 ? "🌞" : "🌙"} {time.toLocaleString([], {hour: '2-digit', minute:'2-digit'})}</span> */}
          <h1> Announcements</h1>
          {/* <span className="botton-0 mr-6 text-sm font-normal">📆 <span className="italic">{time.toLocaleString([], {month: 'long', day: '2-digit'})}, {time.getFullYear()}</span></span> */}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div
            id="announcementWrapper"
            className="mt-12 overflow-y-auto bg-danger"
          >
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id.toString()}
                userRole={"admin"}
                announcement={announcement}
                handleRefresh={() => handleRefresh()}
                setValue={setThreadValue}
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
