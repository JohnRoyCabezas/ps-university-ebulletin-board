import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBuildingColumns,
  faBuildingUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminSettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full">
        <h1 className="font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          Admin Settings
        </h1>
        <div className="flex justify-center items-end mb-14 h-1/2 w-full">
          <div
            onClick={() => navigate('/manageusers')}
            className="flex flex-col border-2 mx-10 w-48 h-48 p-2 rounded-lg justify-center cursor-pointer hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={faUsers}
              size="5x"
              color="#A7A7A7"
              className="flex flex-col"
            />
            <h1 className="font-bold pt-3 text-lg flex justify-center">
              Manage Users
            </h1>
          </div>
          <div
            onClick={() => navigate('/createcollege')}
            className="flex flex-col border-2 mx-10 w-48 h-48 p-2 rounded-lg justify-center cursor-pointer hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={faBuildingColumns}
              size="5x"
              color="#A7A7A7"
            />
            <h1 className="font-bold pt-3 text-lg flex justify-center">
              Add College
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-start mt-14 h-1/2 w-full">
          <div
            onClick={() => navigate('/createdepartment')}
            className="flex flex-col border-2 mx-10 w-48 h-48  p-2 rounded-lg justify-center cursor-pointer hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={faBuildingUser}
              size="5x"
              color="#A7A7A7"
              className="flex flex-col"
            />
            <h1 className="font-bold pt-3 text-lg flex justify-center">
              Add Department
            </h1>
          </div>
          <div
            onClick={() => navigate('/createclass')}
            className="flex flex-col border-2 mx-10 w-48 h-48  p-2 rounded-lg justify-center cursor-pointer hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faBook} size="5x" color="#A7A7A7" />{' '}
            <h1 className="font-bold pt-3 text-lg flex justify-center">
              Add Class
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
