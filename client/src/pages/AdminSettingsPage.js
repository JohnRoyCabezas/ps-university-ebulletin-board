import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBuildingColumns,
  faBuildingUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../components/ThemeContext';

const AdminSettingsPage = () => {
  const { theme } = useContext(ThemeContext);
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
            className={`flex flex-col border-2 mx-10 w-48 h-48 p-2 rounded-lg justify-center cursor-pointer ${theme} bg-opacity-10 hover:bg-opacity-30`}
          >
            <FontAwesomeIcon
              icon={faUsers}
              size="5x"
              color="#50577A"
              className="flex flex-col"
            />
            <h1 className="font-bold pt-3 text-lg flex justify-center">
              Manage Users
            </h1>
          </div>
          <div
            onClick={() => navigate('/createcollege')}
            className={`flex flex-col border-2 mx-10 w-48 h-48 p-2 rounded-lg justify-center cursor-pointer ${theme} bg-opacity-10 hover:bg-opacity-30`}
          >
            <FontAwesomeIcon
              icon={faBuildingColumns}
              size="5x"
              color="#50577A"
            />
            <h1 className="font-bold pt-3 text-lg flex justify-center">
              Add College
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-start mt-14 h-1/2 w-full">
          <div
            onClick={() => navigate('/createdepartment')}
            className={`flex flex-col border-2 mx-10 w-48 h-48 p-2 rounded-lg justify-center cursor-pointer ${theme} bg-opacity-10 hover:bg-opacity-30`}
          >
            <FontAwesomeIcon
              icon={faBuildingUser}
              size="5x"
              color="#50577A"
              className="flex flex-col"
            />
            <h1 className="font-bold pt-3 text-lg flex justify-center">
              Add Department
            </h1>
          </div>
          <div
            onClick={() => navigate('/createclass')}
            className={`flex flex-col border-2 mx-10 w-48 h-48 p-2 rounded-lg justify-center cursor-pointer ${theme} bg-opacity-10 hover:bg-opacity-30`}
          >
            <FontAwesomeIcon icon={faBook} size="5x" color="#50577A" />{' '}
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
