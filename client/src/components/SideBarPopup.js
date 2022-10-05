import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faChevronUp,
  faChevronDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div className="flex items-center p-2">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-full w-12 ml-10"
          alt="Avatar"
        />
        <label className="mx-2">Avatar</label>
        {showModal == true ? (
          <button className="button-default" onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        ) : (
          <button className="button-default" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        )}
      </div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center p-2">
            <FontAwesomeIcon icon={faGear} />
            <label className="mx-2">Admin Settings</label>
          </div>
          <div className="flex justify-center items-center p-2">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <label className="mx-2">Logout</label>
          </div>
        </>
      ) : null}
    </>
  );
}