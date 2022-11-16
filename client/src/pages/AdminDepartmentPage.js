import { React, useEffect, useState } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import Thread from "../components/Thread";
import AnnouncementApi from "../api/AnnouncementApi";
import DepartmentApi from "../api/DepartmentApi";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import Pusher from "pusher-js";

const AdminDepartment = () => {
  const { departmentid } = useParams();
  const navigate = useNavigate();
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState();
  const [announcements, setAnnouncements] = useState([]);
  const [department, setDepartment] = useState();
  const params = {
    announcementable_id: departmentid,
    announcementable_type: "App/Models/Department",
  };

  function setThreadValue(value) {
    setThread(value);
  }

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

  useEffect(() => {
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncements(res.data);
    });
    DepartmentApi.fetchSpecificDepartment(departmentid).then(({ data }) => {
      setDepartment(data);
    });
  }, [departmentid]);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, [announcements]);

  function handleRefresh() {
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncements(res.data);
    });
  }
  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute top-0 z-10 w-full font-bold p-3 text-lg bg-white border-b-2">
          {department?.department} Announcements
          <button
            type="button"
            className="p-2 ml-4 bg-regal-blue float-right text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => navigate(`/editdepartment/${departmentid}`)}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
            Edit
          </button>
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div id="announcementWrapper" className="mt-12 overflow-y-auto">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id.toString()}
                userRole={"admin"}
                announcement={announcement}
                handleRefresh={() => handleRefresh()}
                setValue={setThreadValue}
                setAnnouncementThread={setAnnouncementThread}
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
          userRole={"student"}
          setValue={setThreadValue}
          announcementThread={announcementThread}
        />
      )}
    </div>
  );
};

export default AdminDepartment;
