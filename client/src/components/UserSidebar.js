import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import UserApi from "../api/UserApi";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faGear,
  faBars,
  faBuildingColumns,
  faBuilding,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import ClassCard from "./ClassCard";
import EditSettingModal from "./EditSettingModal";
import { ThemeContext } from "./ThemeContext";

const UserSidebar = () => {
  const user = JSON.parse(Cookies.get("user" || "{}"));
  const [userData, setUserData] = useState({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEditSetting, setShowEditSetting] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const initial = {type: "", id: 0}
  const [active, setActive] = useState(initial);

  const navigate = useNavigate();
  const {collegeid, departmentid, classid} = useParams();

  useEffect(() => {
    if (!!classid) {
      setActive({ type: "class", id: classid });
    } else if (!!departmentid) {
      setActive({ type: "department", id: departmentid });
    } else if (!!collegeid) {
      setActive({ type: "college", id: collegeid });
    } else {
      setActive(initial);
    }
  }, [collegeid, departmentid, classid]);

  useEffect(() => {
    UserApi.fetchUser().then((res) => {
      setUserData(res.data);
      setTheme(res?.data?.theme ? res?.data?.theme : 'bg-regal-blue');
    });
  }, []);

  const university = userData?.university;
  const college = userData?.department?.college;
  const department = userData?.department;
  const courses = userData?.course_user;

  const handleLogout = () => {
    AuthApi.logout().then((res) => {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("params");
      Cookies.remove("universityid");
      navigate("/");
    });
  };

  return (
    <div className="flex w-full h-screen">
      {showEditSetting && (
        <EditSettingModal setShowEditSetting={setShowEditSetting} />
      )}
      {/* sidebar content */}
      <nav
        id="sidebar"
        className={`sidebar-wrapper relative flex flex-col shrink-0 justify-between transition-all ease-in ${theme} bg-opacity-90 duration-300 text-gray-300 w-60 ${
          !showSidebar && "-ml-184px transition-all ease-in"
        }`}
      >
        <div className="sidebar-content flex flex-col justify-center w-full pb-14 z-50 overflow-y-auto">
          {/* sidebar header */}
          <div
            className={`sidebar-brand absolute top-0 w-full px-4 h-14 flex justify-between items-center ${theme} bg-opacity-100 font-semibold text-lg text-white leading-5 border-b border-gray-500`}
          >
            <Link
              to="/announcement"
              className={`group truncate opacity-100 transition-all ease-in ${
                !showSidebar && "opacity-0 transition-all ease-in"
              }`}
            >
              {university?.university}
              <div className="group-hover:visible invisible absolute w-3/4 whitespace-pre-wrap rounded shadow-inner border border-slate-500 p-2 right-1/2 top-1/3 translate-x-1/2 translate-y-1/2 bg-slate-800 text-sm font-light z-50">
                {university?.university}
              </div>
            </Link>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="button flex items-center justify-center w-6 h-6 rounded py-0.5 px-1 ml-2 hover:bg-black hover:bg-opacity-50 hover:text-white transition-all ease-in"
            >
              <FontAwesomeIcon icon={faBars} size="sm" />
            </button>
          </div>

          {/* sidebar items */}
          <div
            className={`sidebar-menu font-light pt-2 mt-14 overflow-y-auto opacity-100 transition-all ease-in ${
              !showSidebar && "opacity-0 transition-all ease-in"
            }`}
          >
            <ul>
              <li className="sidebar-dropdown-header font-bold px-5 py-2">
                <span>Announcements</span>
              </li>
              <li>
                <div className="group flex justify-between items-center my-1 px-4 text-sm font-semibold">
                  <Link to="/announcement" className="flex items-center w-full">
                    <FontAwesomeIcon
                      icon={faStar}
                      className={`button rounded h-3 w-3 p-2 bg-black bg-opacity-25 group-hover:bg-opacity-50 transition-all ease-in
                      ${
                        active?.type === ""
                          ? "text-sky-500 group-hover:text-sky-500"
                          : "group-hover:text-white"
                      }`}
                    />
                    <span className="ml-2 group-hover:text-white transition-all ease-in truncate">
                      University
                    </span>
                  </Link>
                </div>
              </li>
              {college && (
                <li>
                  <div className="group flex justify-between items-center my-1 px-4 text-sm">
                    <Link
                      to={`college/${college?.id}`}
                      className="flex items-center w-full"
                    >
                      <FontAwesomeIcon
                        icon={faBuildingColumns}
                        className={`button rounded h-3 w-3 p-2 bg-black bg-opacity-25 group-hover:bg-opacity-50 transition-all ease-in
                        ${
                          active?.type === "college" &&
                          Number(active?.id) === college?.id
                            ? "text-sky-500 group-hover:text-sky-500"
                            : "group-hover:text-white"
                        }
                        `}
                      />
                      <span className="ml-2 group-hover:text-white transition-all ease-in whitespace-nowrap">
                        {college?.college}
                      </span>
                    </Link>
                  </div>
                </li>
              )}
              {department && (
                <li>
                  <div className="group flex justify-between items-center my-1 px-4 text-sm">
                    <div className="flex items-center w-full">
                      <Link
                        to={`college/${department?.college_id}/${department?.id}`}
                        className="flex items-center w-full"
                      >
                        <FontAwesomeIcon
                          icon={faBuilding}
                          className={`button rounded h-3 w-3 p-2 bg-black bg-opacity-25 group-hover:bg-opacity-50 transition-all ease-in
                          ${
                            active?.type === "department" &&
                            Number(active?.id) === department?.id
                              ? "text-sky-500 group-hover:text-sky-500"
                              : "group-hover:text-white"
                          }`}
                        />
                        <span className="ml-2 group-hover:text-white transition-all ease-in whitespace-nowrap">
                          {department?.department}
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
              )}

              {courses?.length > 0 && (
                <>
                  <li className="sidebar-dropdown-header font-bold mt-5 px-5 py-2">
                    <span>Classes</span>
                  </li>
                  <li>
                    {courses?.map((course) => {
                      return (
                        <ClassCard
                          active={active}
                          key={course.id}
                          collegeid={college?.id}
                          course={course?.course}
                          type="user"
                        />
                      );
                    })}
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* footer */}
        <div
          className={`sidebar-footer absolute bottom-0 w-full h-14 px-4 flex overflow-hidden ${theme} bg-opacity-100 z-50`}
        >
          <div className={`user-info flex items-center w-full justify-between`}>
            <div
              className={`flex items-center opacity-100 transition-all ease-in ${
                !showSidebar && "opacity-0 transition-all ease-in"
              }`}
            >
              <div className="user-pic">
                <img
                  className="rounded w-10 h-10 mr-2 bg-white bg-opacity-40"
                  src={user?.avatar}
                  alt="User"
                />
              </div>
              <div className="flex flex-col w-24 justify-center">
                {/* user name */}
                <div className="user-name truncate">{user?.fullname}</div>
                {/* user role */}
                <div className="user-role font-light text-xs">
                  {user?.role_user?.role?.role}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setShowEditSetting(true);
                }}
                className={`button flex items-center justify-center w-6 h-6 rounded mr-1 py-0.5 px-1 hover:bg-black hover:bg-opacity-50 hover:text-white opacity-100 transition-all ease-in ${
                  !showSidebar && "opacity-0 transition-all ease-in"
                }`}
              >
                <FontAwesomeIcon icon={faGear} />
              </button>
              <div
                className={`flex h-8 border-r transition-all ease-in ${
                  !showSidebar && "h-0 transition-all ease-in"
                }`}
              ></div>
              <button
                onClick={handleLogout}
                className={`button flex items-center justify-center w-6 h-6 rounded py-0.5 px-1 ml-1 hover:bg-black hover:bg-opacity-50 hover:text-white transition-all ease-in`}
              >
                <FontAwesomeIcon icon={faSignOut} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full flex flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default UserSidebar;