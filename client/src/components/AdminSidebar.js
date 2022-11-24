import React, { useEffect, useState, useContext } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import AuthApi from "../api/AuthApi";
import UserApi from "../api/UserApi";
import Cookies from "js-cookie";
import { UserContext } from "../utils/UserContext";
import AdminSettingsModal from './AdminSettingsModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faGear, faBars } from "@fortawesome/free-solid-svg-icons";
import CollegeCard from "./CollegeCard";

const AdminSidebar = () => {
  const {user, logout} = useContext(UserContext);
  const {theme} = user;
  const [userData, setUserData] = useState(user);
  const [showSidebar, setShowSidebar] = useState(true);
  const [adminSettingsModal, setAdminSettingsModal] = useState(false);
  const initial = {type: "", id: 0}
  const [active, setActive] = useState(initial);

  const navigate = useNavigate();
  const {collegeid, departmentid, classid} = useParams();

  useEffect(()=> {
    setUserData(user)
  }, [user])

  const university = userData?.university;
  const colleges = userData?.university?.colleges;

  useEffect(() => {
    if (!!classid) {
      setActive({type: "class", id: classid});
    } else if (!!departmentid) {
      setActive({type: "department", id: departmentid});
    } else if (!!collegeid) {
      setActive({type: "college", id: collegeid})
    } else {
      setActive(initial)
    }
  }, [collegeid, departmentid, classid])

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
      {
        adminSettingsModal && <div className="z-1">
        <AdminSettingsModal
          university = {university?.university}
          setShowModal = {setAdminSettingsModal}
        ></AdminSettingsModal></div>
      }
      {/* sidebar content */}
      <nav
        id="sidebar"
        className={`sidebar-wrapper relative flex flex-col shrink-0 justify-between transition-all ease-in ${theme} bg-opacity-90 duration-300 text-gray-300 w-60 ${
          !showSidebar && "-ml-184px transition-all ease-in"
        }`}
      >
        {/* sidebar header */}
        <div className={`sidebar-brand absolute top-0 w-full px-4 h-14 flex justify-between items-center ${theme} bg-opacity-100 font-semibold text-lg text-white leading-5 border-b border-gray-500`}>
          <Link
            to="/adminannouncement"
            className={`group truncate opacity-100 transition-all ease-in ${
              !showSidebar && "opacity-0 transition-all ease-in"
            }`}
          >
            {university?.university}
            <div className="group-hover:visible invisible absolute w-3/4 whitespace-pre-wrap rounded shadow-inner border border-slate-500 p-2 right-1/2 top-1/3 translate-x-1/2 translate-y-1/2 bg-slate-800 text-sm font-light z-50">
              {university?.university}
            </div>
          </Link>

          <div className="flex ml-2">
            <button
              onClick={()=> setAdminSettingsModal(true)}
              className={`button flex items-center justify-center w-6 h-6 rounded py-0.5 px-1 hover:bg-slate-600 hover:text-white transition-all ease-in ${
                !showSidebar && "opacity-0 hidden transition-all ease-in"
              }`}
            >
              <FontAwesomeIcon icon={faGear} size="sm" />
            </button>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="button flex items-center justify-center w-6 h-6 rounded py-0.5 px-1 hover:bg-slate-600 hover:text-white transition-all ease-in"
            >
              <FontAwesomeIcon icon={faBars} size="sm" />
            </button>
          </div>
        </div>

        <div className="sidebar-content flex flex-col justify-center w-full overflow-y-auto">
          {/* sidebar items */}
          <div
            className={`sidebar-menu font-light overflow-y-auto my-14 py-2 opacity-100 transition-all ease-in ${
              !showSidebar && "opacity-0 transition-all ease-in"
            }`}
          >
            <div className="sidebar-dropdown">
              {/* college */}
              {colleges?.map((college) => {
                return (
                  <CollegeCard active={active} user={user} college={college} key={college.id} />
                );
              })}
            </div>
          </div>
        </div>

        {/* footer */}
        <div
          className={`sidebar-footer absolute bottom-0 w-full h-14 px-4 flex overflow-hidden ${theme} bg-opacity-100 z-50}`}
        >
          <div className={`user-info flex items-center w-full justify-between`}>
            <div
              className={`flex items-center opacity-100 transition-all ease-in ${
                !showSidebar && "opacity-0 transition-all ease-in"
              }`}
            >
              <div className="user-pic">
                <img
                  className="rounded w-10 h-10 mr-2 bg-slate-700"
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
                  navigate("/adminsettings");
                }}
                className={`button flex items-center justify-center w-6 h-6 rounded mr-1 py-0.5 px-1 hover:bg-slate-600 hover:text-white opacity-100 transition-all ease-in ${
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
                className={`button flex items-center justify-center w-6 h-6 rounded py-0.5 px-1 ml-1 hover:bg-slate-600 hover:text-white transition-all ease-in`}
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

export default AdminSidebar;
