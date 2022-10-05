import React from 'react';
import Sidebar from '../components/Sidebar';
import AnnouncementCard from '../components/AnnouncementCard';
import RichTextEditor from '../components/RichTextEditor';

const AdminAnnouncementPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="relative flex flex-col h-screen">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">Announcements</h1>
        <div className="flex flex-col justify-between h-full">
          <div className="mt-12 overflow-y-scroll">
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
            <AnnouncementCard />
        
          </div>
          <div className="px-5">
            <RichTextEditor />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminAnnouncementPage;