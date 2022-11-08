import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faChevronUp,
  faChevronDown,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import AuthApi from '../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SideBarPopupUser = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(Cookies.get('user') || '{}');

  const handleLogout = () => {
    AuthApi.logout().then((res) => {
      Cookies.remove('token');
      Cookies.remove('user');
      Cookies.remove('params');
      navigate('/');
      document.title = "University | E-Bulletin";
    });
  };

  useEffect(() => {
    setShowModal(props.show);
  })

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="flex justify-center items-center p-2">
        <img
          onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
          src={JSON.parse(Cookies.get('user')).avatar}
          className="rounded-full w-11 bg-white"
        />
        <label className="mx-2">{user ? user.fullname : 'User'}</label>
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
      {showModal && (
        <>
          <div
            className="flex justify-center items-center p-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faGear} />
            <span className="mx-2" onClick={() => navigate('/changepassword')}>User Settings</span>
          </div>
          <div className="flex justify-center items-center p-2">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <button onClick={handleLogout} className="mx-2">
              Logout
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default SideBarPopupUser;
