import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from '@fortawesome/free-regular-svg-icons';
import moment from "moment";
import parse from 'html-react-parser';

export default function AnnouncementCard(props) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div id={props.id.toString()}>
      <div
        className="relative flex shadow-lg bg-white w-full border-b-2 p-6"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{
          backgroundColor: isShown ? "#EAE8E8" : "",
        }}
      >
        <img
          src={props.announcement.user.avatar}
          className="rounded-full w-12 h-12"
          alt="Avatar"
        />

        <div className="flex flex-col ml-2">
          <div className="flex justify-start items-center mb-2">
            <h5 className="font-bold">{props.announcement.user.fullname}</h5>
            <p className="ml-2 text-xs"><i>{moment(props.announcement.created_at).fromNow()}</i></p>
          </div>
          <div>
            <p className="text-gray-700 text-base">
              {parse(props.announcement.announcement)}
            </p>
          </div>
        </div>
        {isShown && (
          <div className="absolute top-0 right-0 translate-y-1/2 -translate-x-1/2 drop-shadow-md px-2 py-0.5 bg-white text-gray-500 border-regal-blue border-2 rounded cursor-pointer">
            <button className="cursor-pointer"><FontAwesomeIcon icon={faComment} size="lg" color="#162750" /></button>
          </div>
        )}
      </div>
    </div>
  );
}
