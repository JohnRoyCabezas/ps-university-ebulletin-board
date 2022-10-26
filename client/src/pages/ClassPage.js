import { React, useEffect } from 'react';
import ChatCard from '../components/ChatCard';
import chats from '../shared/json/Chats';
import RichTextEditor from '../components/RichTextEditor';

const ClassPage = () => {
  useEffect(() => {
    const lastDiv = document.getElementById("chats-wrapper");
    lastDiv.scrollTo(0, lastDiv.scrollHeight);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col w-full">
        <h1 className="absolute top-0 z-50 w-full font-bold p-3 text-lg bg-white border-b-2">
          Class Chat
        </h1>
        <div className="flex flex-col justify-between h-full">
          <div id="chats-wrapper" className="mt-12 overflow-y-auto">
            {chats.map((chat) => (
              <div key={chat?.id}>
                <ChatCard chat={chat} />
              </div>
            ))}
          </div>
          <div className="p-2 rounded-3xl">
            <RichTextEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
