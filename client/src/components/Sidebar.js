import React, { useEffect, useState, useContext } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import SideBarPopupAdmin from './SideBarPopupAdmin';
import AnnouncementIcon from '../shared/AnnouncementIcon';
import UserApi from '../api/UserApi';
import UniversityApi from '../api/UniversityApi';
import ROLES from './Roles';
import Cookies from 'js-cookie';
import CollegeAccordion from './CollegeAccordion';
import SideBarPopupUser from './SidebarPopupUser';
import AdminSettingsModal from './AdminSettingsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../utils/UserContext';

const Sidebar = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const {user, setTheme} = useContext(UserContext);
  const {theme} = user;
  const [Show, setShowModal] = useState(false);
  const [university, setUniversity] = useState();
  const [adminSettingsModal, setAdminSettingsModal] = useState(false);

  useEffect(() => {
    UserApi.fetchUser().then((res) => {
      setUserData(res.data);
      setTheme(res?.data?.theme ? res?.data?.theme : 'bg-regal-blue');
    });
  }, []);

  useEffect(() => {
    if (userData) {
      UniversityApi.fetchSpecificUniversity(userData.university_id).then(({ data }) => {
        setUniversity(data)
        document.title = data.university + " | E-Bulletin";
        Cookies.set("universityid", data.id);
      })
    }
  }, [userData])

  return (
    <div className={`flex shrink-0 w-full h-screen`}>
      {
        adminSettingsModal && <div className="z-1">
        <AdminSettingsModal
          university = {university?.university}
          setShowModal = {setAdminSettingsModal}
        ></AdminSettingsModal></div>
      }
      <div className={`relative flex flex-col w-64 text-white`}>
        <div
          className={`flex justify-between items-center px-4 sticky top-0 border-b-2 z-10 cursor-pointer ${theme}`}
          >
          <span className="text-xl font-bold py-2 mx-auto" onClick={() => navigate('/')}>
            {university?.university}
          </span>
          {user?.role_user?.role_id === ROLES['ADMIN'] &&
            <div
              className="flex my-auto"
              onClick={()=> setAdminSettingsModal(true)}>
              <FontAwesomeIcon icon={faGear} size="lg" color="white"/>
            </div>
          }
        </div>
        {/* Edit here */}
        <div className={`flex flex-col h-full overflow-y-auto ${theme} bg-opacity-70`}>
          <div>
            <div
              className={`flex items-center px-5 py-2 ${Object.keys(id) == 0 && { theme }
                } cursor-pointer`}
              onClick={() => {
                user?.role_user?.role_id === ROLES['ADMIN']
                  ? navigate('/adminannouncement')
                  : navigate('/announcement');
              }}
            >

              <AnnouncementIcon />
              <span className="ml-2">Announcement</span>
            </div>
            {user?.role_user?.role_id === ROLES['ADMIN'] ? (
              userData?.university?.colleges?.map((college) => {
                return (
                  <Link to={`/admincollege/${college.id}`} key={college.id}>
                    <CollegeAccordion
                      data={college}
                      departments={college.departments}
                    />
                  </Link>
                );
              })
            ) : userData?.department && (
              <Link to={`/college/${userData?.department?.college_id}`}>
                <CollegeAccordion
                  userData={userData}
                  data={userData?.department?.college}
                  department={userData?.department}
                />
              </Link>
            )}
          </div>
        </div>
        <div
          className={`absolute w-full bottom-0 ${theme} bg-opacity-25`}
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
        >
          {user?.role_user?.role_id === ROLES['ADMIN'] ? (
            <SideBarPopupAdmin show={Show} />
          ) : (
            <SideBarPopupUser show={Show} />
          )}
        </div>
      </div>
      <div className="w-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
