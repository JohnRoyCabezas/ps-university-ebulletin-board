import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faChevronUp,
  faChevronDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import AuthApi from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Modal() {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthApi.logout().then(res => {
      Cookies.remove('token');
      Cookies.remove('user');
      navigate('/');    
    })
  }

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
          <button
            className="button-default"
            onClick={() => setShowModal(false)}
          >
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
            <button onClick={handleLogout} className="mx-2">
              Logout
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}