import React, { useEffect, useContext } from 'react';
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
import { ThemeContext } from './ThemeContext';

const SideBarPopupAdmin = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(Cookies.get('user') || '{}');
  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = React.useState(false);


  const handleLogout = () => {
    AuthApi.logout().then(() => {
      Cookies.remove('token');
      Cookies.remove('user');
      Cookies.remove('params');
      Cookies.remove('universityid');
      navigate('/');
      document.title = "University | E-Bulletin";
    });
  };

  useEffect(() => {
    setShowModal(props.show);
  })

  return (
    <>
      <div className={`bg-white`}>
        <div className={`flex justify-evenly ${theme}`}>
          <div className='flex justify-center items-center p-2'>
            <img
              onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
              src={JSON.parse(Cookies.get('user')).avatar}
              className="rounded-full w-11 bg-white"
            />

            <label className="mx-2 text-center">{user ? user.fullname : 'User'}</label>
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
        </div>

        {showModal && (
          <>
            <div
              onClick={() => navigate('/adminsettings')}
              className={`flex justify-center items-center p-2 cursor-pointer ${theme} border-white`}
            >
              <FontAwesomeIcon icon={faGear} />
              <span className="mx-2">Admin settings</span>
            </div>
            <div className={`flex justify-center items-center p-2 ${theme}`}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <button onClick={handleLogout} className="mx-2">
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SideBarPopupAdmin;
