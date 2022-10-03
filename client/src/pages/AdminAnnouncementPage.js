import React from "react";
import Sidebar from "../components/Sidebar";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";

const AdminAnnouncementPage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full h-full">
        <h1 className="font-bold p-3 text-lg border-b-2">Announcements</h1>
        <div>
          <AnnouncementCard />
        </div>

        <RichTextEditor />
      </div>
    </div>
  );
};
export default AdminAnnouncementPage;
