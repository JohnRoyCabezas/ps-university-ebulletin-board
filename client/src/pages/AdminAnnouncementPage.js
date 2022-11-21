import { React, useEffect, useLayoutEffect, useState } from "react";
import Thread from "../components/Thread";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";
import Pusher from "pusher-js";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AdminAnnouncementPage = () => {
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState();
  const [announcements, setAnnouncements] = useState([]);
  const user = JSON.parse(Cookies.get('user'));
  const [isAlter, setIsAlter] = useState(false);
  const params = {
    announcementable_id: user.university_id,
    announcementable_type: "App/Models/University",
  };

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

  function handleRefresh() {
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncements(res.data);
    });
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

  return (
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
                threadOpen={isThread}
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
