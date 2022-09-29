import React from "react";
import Sidebar from "../components/Sidebar";
import SelectDropDownComponent from "../components/Dropdown";

const AnnouncementPage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="container w-full">
        <h1 className="font-bold p-3 text-lg">Announcements</h1>
        <hr></hr>
        <div class="block p-6 rounded-lg shadow-lg bg-white w-full">
          <div className="flex">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-12"
              alt="Avatar"
            />
            <h5 class="leading-tight font-bold ml-3 mb-2">Admin</h5>
            <p class="leading-tight ml-2 mb-3 text-xs">
              Sept. 21, 2022 at 12:44PM
            </p>
          </div>
          <p class="text-gray-700 text-base ml-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <hr></hr>
        <div class="block p-6 rounded-lg shadow-lg bg-white w-full">
          <div className="flex">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-12"
              alt="Avatar"
            />
            <h5 class="leading-tight font-bold ml-3 mb-2">Admin</h5>
            <p class="leading-tight ml-2 mb-3 text-xs">
              Sept. 21, 2022 at 12:44PM
            </p>
          </div>
          <p class="text-gray-700 text-base ml-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <hr></hr>
        <div class="block p-6 rounded-lg shadow-lg bg-white w-full">
          <div className="flex">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-12"
              alt="Avatar"
            />
            <h5 class="leading-tight font-bold ml-3 mb-2">Admin</h5>
            <p class="leading-tight ml-2 mb-3 text-xs">
              Sept. 21, 2022 at 12:44PM
            </p>
          </div>
          <p class="text-gray-700 text-base ml-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AnnouncementPage;
