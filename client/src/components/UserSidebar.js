import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import AuthApi from "../api/AuthApi";
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
import { UserContext } from "../utils/UserContext";

const UserSidebar = () => {
  const { user, logout } = useContext(UserContext)
  const { theme } = user;
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEditSetting, setShowEditSetting] = useState(false);
  const initial = { type: "", id: 0 }
  const [active, setActive] = useState(initial);

  const navigate = useNavigate();
  const { collegeid, departmentid, classid } = useParams();

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

  const university = user?.university;
  const college = user?.department?.college;
  const department = user?.department;
  const courses = user?.course_user;

  const handleLogout = () => {
    AuthApi.logout().then((res) => {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("params");
      Cookies.remove("universityid");
      logout();
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
        className={`sidebar-wrapper relative flex flex-col shrink-0 justify-between transition-all ease-in ${theme} bg-opacity-90 duration-300 text-gray-300 w-60 ${!showSidebar && "-ml-184px transition-all ease-in"
          }`}
      >
        <div className="sidebar-content flex flex-col justify-center w-full pb-14 z-50 overflow-y-auto">
          {/* sidebar header */}
          <div
            className={`sidebar-brand absolute top-0 w-full px-4 h-14 flex justify-between items-center ${theme} bg-opacity-100 font-semibold text-lg text-white leading-5 border-b border-gray-500`}
          >
            <Link
              to="/announcement"
              className={`group truncate opacity-100 transition-all ease-in ${!showSidebar && "opacity-0 transition-all ease-in"
                }`}
            >
              {university?.university}
              <div className={`group-hover:visible invisible w-full group-hover:delay-200 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 group-hover:translate-x-3 group-hover:transition group-hover:ease-in-out group-hover:duration-700 absolute`}>
                <div className={`w-fit absolute py-3 left-0 text-center whitespace-pre-wrap rounded shadow-inner absolute transition ease-in-out delay-300 group-hover:delay-200 group-hover:scale-120 duration-200 border border-slate-500 group-hover:bg-opacity-60 ${theme} group-hover:bg-opacity-90 group-hover:text-white px-3 text-xs font-normal z-50`}>{university?.university}</div>

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
            className={`sidebar-menu font-light pt-2 mt-14 overflow-y-auto opacity-100 transition-all ease-in ${!showSidebar && "opacity-0 transition-all ease-in"
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
                      ${active?.type === ""
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
                        ${active?.type === "college" &&
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
                          ${active?.type === "department" &&
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
              className={`flex items-center opacity-100 transition-all ease-in ${!showSidebar && "opacity-0 transition-all ease-in"
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
                className={`button flex items-center justify-center w-6 h-6 rounded mr-1 py-0.5 px-1 hover:bg-black hover:bg-opacity-50 hover:text-white opacity-100 transition-all ease-in ${!showSidebar && "opacity-0 transition-all ease-in"
                  }`}
              >
                <FontAwesomeIcon icon={faGear} />
              </button>
              <div
                className={`flex h-8 border-r transition-all ease-in ${!showSidebar && "h-0 transition-all ease-in"
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
