import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import EditPassword from "./ChangePassword";
import ThemePick from "./ThemePick";

const EditSettingModal = ({ setShowEditSetting }) => {
  const { theme } = useContext(ThemeContext);
  const [showUpdatePassword, setShowUpdatePassword] = useState(true);

  return (
    <div
      className={`flex ${theme} flex-col bg-opacity-70 w-full h-full fixed z-50 items-center justify-center top-0`}
    >
      <aside
        className="z-50 bg-gray-300 p-4 w-6/12 h-11/12 min-w-6/12 flex flex-col rounded-lg"
        aria-label="Sidebar"
      >
        <div className="relative py-2 flex flex-row-reverse">
          <button
            className="mx-2 hover:bg-gray-500 rounded-md px-1"
            onClick={() => {
              setShowEditSetting(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} size="2xl" />
          </button>
        </div>
        <div className="relative z-50 w-full h-full flex rounded-md">
          <ul
            className={`overflow-y-auto text-sm w-52 font-medium text-gray-700 border-gray-200`}
          >
            <li>
              <button
                className={`inline-block py-2 w-full rounded-md px-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-20 hover:text-white ${
                  showUpdatePassword
                    ? theme + " text-white bg-opacity-50 py-3"
                    : "bg-gray-300"
                }`}
                onClick={() => {
                  setShowUpdatePassword(true);
                }}
              >
                Change Password
              </button>
            </li>

            <li>
              <button
                className={`inline-block py-2 w-full rounded-md px-3 hover:cursor-pointer hover:bg-black hover:bg-opacity-20 hover:text-white ${
                  !showUpdatePassword
                    ? theme + " text-white bg-opacity-50 py-3"
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
          <div className={`flex rounded-r-lg flex-col w-11/12 justify-center`}>
            {showUpdatePassword ? <EditPassword /> : <ThemePick />}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EditSettingModal;
