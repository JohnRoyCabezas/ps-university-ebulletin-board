import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import SideBarPopupAdmin from './SideBarPopupAdmin';
import AnnouncementIcon from '../shared/AnnouncementIcon';
import UserApi from '../api/UserApi';
import ROLES from './Roles';
import Cookies from 'js-cookie';
import CollegeAccordion from './CollegeAccordion';
import SideBarPopupUser from './SidebarPopupUser';

const Sidebar = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const user = JSON.parse(Cookies.get('user') || '{}');
  const [Show, setShowModal] = useState(false);

  useEffect(() => {
    UserApi.fetchUser().then((res) => {
      setUserData(res.data);
    });
  }, []);

  return (
    <div className="flex shrink-0 w-full h-screen">
      <div className="relative flex flex-col w-64 bg-regal-blue text-white">
        <div
          onClick={() => navigate('/')}
          className="flex justify-center items-center h-16 px-4 sticky top-0 bg-regal-blue border-b-2 z-50 opacity-1 cursor-pointer"
        >
          <span className="text-xl font-bold bg-regal-blue">
            {user?.role_user?.role_id === ROLES['ADMIN']
              ? userData?.university?.university
              : userData?.department?.college?.university?.university}
          </span>
        </div>
        <div className="flex flex-col h-full overflow-y-auto mb-16">
          <div>
            <div
              className={`flex items-center px-5 py-2 ${
                Object.keys(id) == 0 && 'bg-slate-800'
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
            ) : (
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
          className="absolute w-full bottom-0 bg-dark-blue"
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
