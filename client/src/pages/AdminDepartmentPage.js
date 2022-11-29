import { React, useEffect, useState, useContext } from "react";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import Thread from "../components/Thread";
import AnnouncementApi from "../api/AnnouncementApi";
import DepartmentApi from "../api/DepartmentApi";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import Pusher from "pusher-js";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserContext } from "../utils/UserContext";

const AdminDepartment = () => {
  const { departmentid } = useParams();
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState();
  const [announcements, setAnnouncements] = useState([]);
  const [department, setDepartment] = useState();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv?.scrollTo(0, lastDiv.scrollHeight);
  }, [announcements]);

  function handleRefresh() {
    AnnouncementApi.fetchChannelAnnouncements(params).then((res) => {
      setAnnouncements(res.data);
    });
  }
  return loading? (
      <LoadingSpinner />
    ) : (
    <div className="flex w-full h-screen">
      <div className="relative flex flex-col w-full text-gray-800">
        <div className="absolute flex items-center justify-between h-14 px-4 top-0 z-10 w-full font-bold text-lg bg-white border-b-2">
          <div className="truncate">
            <FontAwesomeIcon icon={faBuilding} className="mr-2" />
            {department?.department}
          </div>
          <button
            type="button"
            className={`p-2 ml-4 ${user.theme} bg-opacity-90 float-right text-white font-medium  text-xs leading-tight uppercase rounded shadow-md hover:bg-opacity-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out`}
            onClick={() => navigate(`/editdepartment/${departmentid}`)}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
            Edit
          </button>
        </div>
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
