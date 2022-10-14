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
    <div className="flex h-screen">
      <div className="flex flex-col w-full">
        <h1 className="font-bold p-3 sticky top-0 bg-white text-lg border-b-2">
          Admin Settings
        </h1>
        <div className="flex flex-col h-full overflow-y-scroll scroll text-gray-500">
          <div className="flex justify-center">
            <div
              onClick={() => navigate('/manageusers')}
              className="flex flex-col justify-center m-28 cursor-pointer"
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
              className="flex flex-col justify-center m-28 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faBuildingColumns}
                size="5x"
                color="#A7A7A7"
              />{' '}
              <h1 className="font-bold pt-3 text-lg flex justify-center">
                Add College
              </h1>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              onClick={() => navigate('/createdepartment')}
              className="flex flex-col justify-center m-28 cursor-pointer"
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
              className="flex flex-col justify-center m-28 cursor-pointer"
            >
              <FontAwesomeIcon icon={faBook} size="5x" color="#A7A7A7" />{' '}
              <h1 className="font-bold pt-3 text-lg flex justify-center">
                Add Class
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSettingsPage;
