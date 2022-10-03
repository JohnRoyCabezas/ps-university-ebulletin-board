import React from "react";
import Sidebar from "../components/Sidebar";
import AnnouncementCard from "../components/AnnouncementCard";

const AnnouncementPage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <h1 className="font-bold p-3 text-lg border-b-2">Announcements</h1>
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
    </div>
  );
};
export default AnnouncementPage;
