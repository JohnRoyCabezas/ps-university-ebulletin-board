import React, { useState } from "react";
import StudentMessageOptions from "./StudentMessageOptions"
import AdminMessageOptions from "./AdminMessageOptions"

export default function AnnouncementCard() {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <div
        class="block p-6 shadow-lg bg-white w-full border-b-2"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{
          backgroundColor: isShown ? "#EAE8E8" : "",
        }}
      >
        <div className="flex">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-full w-12"
            alt="Avatar"
          />
          <h5 class="leading-tight font-bold ml-3 mb-2">Admin</h5>
          <p class="ml-2 text-xs mt-[2px]">Sept. 21, 2022 at 12:44PM</p>
          {isShown && (
            <AdminMessageOptions />
          )}
        </div>
        <p class="text-gray-700 text-base ml-14">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
