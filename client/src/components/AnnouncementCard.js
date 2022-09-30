import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export default function AnnouncementCard() {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <div
        className="relative flex shadow-lg bg-white w-full border-b-2 p-6"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{
          backgroundColor: isShown ? "#EAE8E8" : "",
        }}
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-full w-12 h-12"
          alt="Avatar"
        />

        <div className="relative flex flex-col ml-2">
          <div className="flex justify-start items-center mb-2">
            <h5 className="font-bold">Admin</h5>
            <p className="ml-2 text-xs">Sept. 21, 2022 at 12:44PM</p>
          </div>
          <div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore gna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          {isShown && (
            <div className="absolute top-0 right-0 drop-shadow-md text-gray-800 cursor-pointer">
              <div>
                <FontAwesomeIcon icon={faComment} size="lg" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
