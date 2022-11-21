import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faChevronUp,
  faChevronDown,
  faRightFromBracket,
  faClose
} from '@fortawesome/free-solid-svg-icons';
import AuthApi from '../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../utils/UserContext';
import EditPassword from './ChangePassword';
import { ThemePick } from './ThemePick';

const SideBarPopupUser = (props) => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const [showEditSetting, setShowEditSetting] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(true);
  const [showChangeTheme, setShowChangeTheme] = useState(false);
  const { theme } = user;

  const handleLogout = () => {
    AuthApi.logout().then((res) => {
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

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div>
        {showEditSetting && (
          <>
            <div
              className={`flex ${theme} flex-col bg-opacity-70 w-full h-full fixed z-50 items-center justify-center top-0`}
            >
              <aside class="z-50 bg-gray-300 p-4 w-6/12 h-11/12 min-w-6/12 flex flex-col rounded-lg" aria-label="Sidebar">
                <div className='relative py-2 flex flex-row-reverse'>
                  <button className='mx-2 hover:bg-gray-500 rounded-md px-1' onClick={() => { setShowEditSetting(false); setShowChangeTheme(false); setShowChangePassword(true) }}><FontAwesomeIcon icon={faClose} size='2xl' /></button>
                </div>
                <div className='relative z-50 w-full h-full flex rounded-md'>
                  <ul className={`overflow-y-auto text-sm w-52 font-medium text-gray-700 border-gray-200`}>

                    <li>
                      <a
                        className={`inline-block py-2 w-full rounded-md px-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-20 hover:text-white ${showChangePassword ? theme + ' text-white bg-opacity-50 py-3' : 'bg-gray-300'}`}
                        onClick={() => { setShowChangePassword(true); setShowChangeTheme(false) }}
                      >
                        Change Password
                      </a>
                    </li>

                    <li>
                      <a
                        className={`inline-block py-2 w-full rounded-md px-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-20 hover:text-white ${showChangeTheme ? theme + ' text-white bg-opacity-50 py-3' : 'bg-gray-300'}`}
                        onClick={() => { setShowChangePassword(false); setShowChangeTheme(true) }}
                      >
                        Change Theme
                      </a>
                    </li>
                  </ul>
                  <div className={`flex rounded-r-lg flex-col w-11/12 justify-center`}>
                    {showChangePassword ? <EditPassword /> : ''}
                    {showChangeTheme ? <ThemePick /> : ''}
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
        <div className={`flex justify-evenly ${theme}`}>
          <div className={`flex justify-center items-center p-2`}>
            <img
              onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
              src={user.avatar}
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
        </div>

        {showModal && (
          <>
            <div
              className={`flex justify-center items-center p-2 cursor-pointer ${theme} border-white`}
            >
              <FontAwesomeIcon icon={faGear} />
              <span className="mx-2" onClick={() => setShowEditSetting(!showEditSetting)}>User Settings</span>
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

export default SideBarPopupUser;
