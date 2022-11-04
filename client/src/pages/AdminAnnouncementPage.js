import { React, useEffect, useState } from "react";
import Thread from "../components/Thread";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import AnnouncementApi from "../api/AnnouncementApi";
import Cookies from "js-cookie";

const AdminAnnouncementPage = () => {
  const university_id = Cookies.get('universityid');
  const [isThread, setThread] = useState(false);
  const [announcementThread, setAnnouncementThread] = useState()
  const [announcements, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
      announcementable_id: university_id,
      announcementable_type: "App/Models/University",
    }
  );

  function setThreadValue(value) {
    setThread(value);
  }

  useEffect(()=> {
    setParams({
      ...params,
      announcementable_id: university_id,
    })
  }, [university_id]);

  useEffect(() => {
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncement(res.data);
        setLoading(false);
      }
    );
  }, [params]);

  useEffect(() => {
    const lastDiv = document.getElementById("announcementWrapper");
    lastDiv?.scrollTo(0, lastDiv.scrollHeight);
  }, [announcements]);

  function handleRefresh() {
    AnnouncementApi.fetchChannelAnnouncements(params).then(
      (res) => {
        setAnnouncement(res.data);
      }
    );
  }

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <div className="absolute top-0 z-50 w-full font-bold flex justify-between p-3 text-2xl bg-white border-b-2">
          <h1> Announcements</h1>
        </div>
        <div className="flex flex-col justify-between h-full">
          {!loading ? (
          <div id='announcementWrapper' className="mt-12 overflow-y-auto bg-danger">
            {
              announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id.toString()}
                  userRole={'admin'}
                  announcement={announcement}
                  handleRefresh={() => handleRefresh()}
                  setValue={setThreadValue}
                  setAnnouncementThread={setAnnouncementThread}
                />
              ))}
          </div>
          ) : (
            <div className="mt-12 flex justify-center align-items">
            <h1 className="flex justify-between font-bold p-3 sticky top-0 bg-white text-xl">Loading...</h1>
            </div>
          )}
          <div className="p-2 rounded-3xl">
            <RichTextEditor
              handleRefresh={() => handleRefresh()}
              params={params}
            />
          </div>
        </div>
      </div>
      {isThread && <Thread userRole={'admin'} setValue={setThreadValue} announcementThread={announcementThread}/>}
    </div>
  );
};

export default AdminAnnouncementPage;
