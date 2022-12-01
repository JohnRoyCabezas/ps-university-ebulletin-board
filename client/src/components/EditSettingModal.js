import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import EditPassword from "./ChangePassword";
import ThemePick from "./ThemePick";
import { UserContext } from "../utils/UserContext";

const EditSettingModal = ({ setShowEditSetting }) => {
  const { theme } = useContext(UserContext).user;
  const [showUpdatePassword, setShowUpdatePassword] = useState(true);

  return (
    <div
      className={`flex ${theme} flex-col bg-opacity-70 w-screen h-screen fixed z-50 items-center justify-center top-0`}
    >
      {/* body */}
      <aside
        className="z-50 py-1 h-fit w-7/12 min-w-fit bg-gray-300 flex flex-col rounded-lg"
        aria-label="Sidebar"
      >
        <div className="relative py-2 flex justify-between flex-row-reverse shadow-md shadow-gray-400 border-b-2 border-gray-400">
          <button
            className={`mx-2 hover:bg-gray-500 rounded-md px-1`}
            onClick={() => {
              setShowEditSetting(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} size="2xl" />
          </button>
          <h1 className="text-center w-full font-medium">User settings</h1>
        </div>
        <div className="mx-auto z-50 w-full h-full flex rounded-md">
          <div className="h-full border-r-4 border-gray-400 border-opacity-30">
            <ul
              className={`overflow-y-auto text-sm w-52 h-full font-medium text-gray-700 border-gray-200 p-2`}
            >
              <li className="my-1">
                <button
                  className={`inline-block py-2 w-full rounded-md px-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-20 hover:text-white ${showUpdatePassword
                    ? theme + " text-white bg-opacity-90"
                    : "bg-gray-300"
                    }`}
                  onClick={() => {
                    setShowUpdatePassword(true);
                  }}
                >
                  Change Password
                </button>
              </li>

              <li className="my-1">
                <button
                  className={`inline-block py-2 w-full rounded-md px-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-20 hover:text-white ${!showUpdatePassword
                    ? theme + " text-white bg-opacity-90"
                    : "bg-gray-300"
                    }`}
                  onClick={() => {
                    setShowUpdatePassword(false);
                  }}
                >
                  Change Theme
                </button>
              </li>
            </ul>
          </div>

          <div className={`flex justify-center py-10 w-4/5 rounded-r-lg`}>
            {showUpdatePassword ? <EditPassword /> : <ThemePick />}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EditSettingModal;
