import React from "react";
import Sidebar from "../components/Sidebar";
import AnnouncementCard from "../components/AnnouncementCard";
import RichTextEditor from "../components/RichTextEditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminAnnouncementPage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="container w-full">
        <h1 className="font-bold p-3 text-lg border-b-2 sticky top-0 bg-white">
          Announcements
        </h1>
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />

        <RichTextEditor />
      </div>
    </div>
  );
};
export default AdminAnnouncementPage;
