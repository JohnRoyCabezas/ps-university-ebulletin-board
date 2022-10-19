import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBarPopup from './SideBarPopup';
import AnnouncementIcon from '../shared/AnnouncementIcon';
import UserApi from '../api/UserApi';
import Cookies from 'js-cookie';
import CollegeAccordion from './CollegeAccordion';
import ROLES from './Roles';

const Sidebar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const user = JSON.parse(Cookies.get('user') || '{}');

  useEffect(() => {
    UserApi.fetchUser().then((res) => {
      setUserData(res.data);
    });
  }, []);

  return (
    <div className="flex shrink-0 w-full h-screen">
      <div className="flex flex-col w-full overflow-y-auto min-w-[240px] max-w-[240px] justify-between bg-regal-blue text-white">
        <div className="mb-20">
          <div
            onClick={() => navigate('/')}
            className="flex justify-center px-2 my-5 cursor-pointer"
          >
            <span className="text-xl font-bold">
              {user?.role_user?.role_id === ROLES['ADMIN']
                ? userData?.university?.university
                : userData?.department?.college?.university?.university}
            </span>
          </div>
          <div className="flex items-center px-5 py-2">
            <AnnouncementIcon />
            <span className="ml-2">Announcement</span>
          </div>
          {user?.role_user?.role_id === ROLES['ADMIN'] ? (
            userData?.university?.colleges?.map((college) => {
              return (
                <div key={college.id}>
                  
                  <CollegeAccordion
                    data={college}
                    departments={college.departments}
                  />
                </div>
              );
            })
          ) : (
            <CollegeAccordion
              userData={userData}
              data={userData?.department?.college}
              department={userData?.department}
            />
          )}
        </div>

        <div className="sticky bottom-0 bg-dark-blue">
          <SideBarPopup />
        </div>
      </div>
      <div className="w-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
