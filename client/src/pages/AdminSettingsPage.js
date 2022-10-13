import React from "react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBuildingColumns,
  faBuildingUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AdminSettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full">
        <h1 className="font-bold p-3 sticky top-0 bg-white text-lg border-b-2">Admin Settings</h1>
        <div className="flex flex-col text-gray-500">
          <div className="flex justify-center">
            <div onClick={() => navigate('/manageusers')} className="m-28 cursor-pointer">
              <FontAwesomeIcon
                icon={faUsers}
                size="9x"
                color="#A7A7A7"
                className="flex flex-col"
              />
              <h1 className="font-bold pt-3 text-lg flex justify-center">Manage Users</h1>
            </div>
            <div onClick={() => navigate('/createcollege')} className="m-28 cursor-pointer">
              <FontAwesomeIcon
                icon={faBuildingColumns}
                size="9x"
                color="#A7A7A7"
              />{" "}
              <h1 className="font-bold pt-3 text-lg flex justify-center">Add College</h1>
            </div>
          </div>
          <div className="flex justify-center">
            <div onClick={() => navigate('/createdepartment')} className="m-28 cursor-pointer">
              <FontAwesomeIcon
                icon={faBuildingUser}
                size="9x"
                color="#A7A7A7"
                className="flex flex-col"
              />
              <h1 className="font-bold pt-3 text-lg flex justify-center">Add Department</h1>
            </div>
            <div onClick={() => navigate('/createclass')} className="m-28 cursor-pointer">
              <FontAwesomeIcon
                icon={faBook}
                size="9x"
                color="#A7A7A7"
              />{" "}
              <h1 className="font-bold pt-3 text-lg flex justify-center">Add Class</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminSettingsPage;
