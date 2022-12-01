import { React, useEffect, useLayoutEffect, useState, useContext } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import AnnouncementApi from "../api/AnnouncementApi";
import CollegeApi from "../api/CollegeApi";
import { useParams } from "react-router-dom";
import Thread from "../components/Thread";
import RichTextEditor from "../components/RichTextEditor";
import Pusher from "pusher-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../utils/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const CollegePage = () => {
  const { collegeid } = useParams();
  const [announcements, setAnnouncements] = useState([]);
  const [college, setCollege] = useState({});
  const [announcementThread, setAnnouncementThread] = useState();
  const [isThread, setThread] = useState(false);
  const { theme } = useContext(UserContext).user;
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const params = {
    announcementable_id: collegeid,
    announcementable_type: "App/Models/College",
  };

  // Initial load
  useEffect(() => {
    setLoading(true);

    const params = {
      announcementable_type: "App/Models/College",
      announcementable_id: collegeid,
    };

    const fetchData = async (params) => {
      const announcements = await AnnouncementApi.fetchChannelAnnouncements(
        params
      );
      const college = await CollegeApi.fetchSpecificCollege(collegeid);

      setAnnouncements(announcements.data);
      setCollege(college.data);

      setLoading(false);
    };

    fetchData(params);
  }, [collegeid]);

  // Pusher update
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

  // Scroll effect
  useLayoutEffect(() => {
    const lastDiv = document?.getElementById("announcementWrapper");
    lastDiv?.scrollHeight * 0.9 < lastDiv?.scrollTop + 1000 ||
    lastDiv?.scrollTop == 0
      ? lastDiv?.scrollTo({
          top: lastDiv?.scrollHeight + 1000,
          behavior: "smooth",
        })
      : lastDiv?.scrollTo({ top: lastDiv?.scrollTop, behavior: "smooth" });
  }, [announcements]);

  function setThreadValue(value) {
    setThread(value);
  }

  function handleRefresh() {
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncements(res.data);
    });
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex w-full h-screen">
      <div className="relative flex flex-col w-full h-screen">
        <h1
          className={`absolute top-0 z-40 h-14 w-full font-bold p-3 text-lg border-b-2 border-gray-300 bg-white`}
        >
          <div className="truncate">
            <FontAwesomeIcon icon={faBuildingColumns} className="mr-2" />
            {college?.college?.college}
          </div>
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div id="announcementWrapper" className="pt-20 overflow-y-auto">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id.toString()}
                announcement={announcement}
                setValue={setThreadValue}
                handleRefresh={() => handleRefresh()}
                announcementThread={announcementThread}
                setAnnouncementThread={setAnnouncementThread}
                threadOpen={isThread}
              />
            ))}
          </div>
          {user?.role_user?.role_id === 1 ? (
            ""
          ) : (
            <div className="p-2 rounded-3xl">
              <RichTextEditor
                handleRefresh={() => handleRefresh()}
                params={params}
              />
            </div>
          )}
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

export default CollegePage;
