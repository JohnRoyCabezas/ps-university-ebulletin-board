import { Route, Routes } from 'react-router-dom';
import React from 'react';

import AdminAnnouncementPage from '../pages/AdminAnnouncementPage';
import CreateCollegePage from '../pages/CreateCollegePage';
import EditCollegePage from '../pages/EditCollegePage';
import CreateDepartmentPage from '../pages/CreateDepartmentPage';
import CreateClassPage from '../pages/CreateClassPage';
import AnnouncementPage from '../pages/AnnouncementPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import LandingPage from '../pages/LandingPage';
import ManageUsersPage from '../pages/ManageUsersPage';
import EditUserPage from "../pages/EditUserPage";
import AdminSettingsPage from '../pages/AdminSettingsPage';
import Unauthorized from '../pages/Unauthorized';
import ProtectedRoute from './utilities/ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';
import CollegePage from '../pages/CollegePage';
import AdminCollegePage from "../pages/AdminCollegePage";
import CreateUniversityPage from "../pages/CreateUniversityPage";
import ClassPage from "../pages/ClassPage";
import DepartmentPage from "../pages/DepartmentPage";
import AdminDepartmentPage from "../pages/AdminDepartmentPage";
import EditPassword from "../components/ChangePassword";
import EditClassPage from "../pages/EditClassPage";
import EditDepartmentPage from "../pages/EditDepartmentPage";
import UserSidebar from '../components/UserSidebar';
import AdminSidebar from '../components/AdminSidebar';
import {UserContextProvider} from "../utils/UserContext"
import TextEditor from '../components/TextEditor'

const RoutesList = () => {

  const ROLES = {
    Student: 1,
    Admin: 2,
    Student_Body: 3,
    Dean: 4,
    Instructor: 5,
  };

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="unauthorized" element={<Unauthorized />}></Route>
        <Route path="createuniversity" element={<CreateUniversityPage />} />

          <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  ROLES.Admin,
                  ROLES.Student,
                  ROLES.Student_Body,
                  ROLES.Dean,
                  ROLES.Instructor,
                ]}
              />
            }
          >
            <Route element={<UserSidebar />}>
              <Route path="announcement" element={<AnnouncementPage />} />
              <Route path="college/:collegeid" element={<CollegePage />} />
              <Route
                path="college/:collegeid/:departmentid"
                element={<DepartmentPage />}
              />
              <Route
                path="college/:collegeid/:departmentid/:classid"
                element={<ClassPage />}
              />
              <Route path="changepassword" element={<EditPassword />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin]} />}>
            <Route element={<AdminSidebar />}>
              <Route path="adminsettings" element={<AdminSettingsPage />} />
              <Route path="adminannouncement" element={<AdminAnnouncementPage />} />
              <Route
                path="admincollege/:collegeid"
                element={<AdminCollegePage />}
              />
              <Route
                path="admincollege/:collegeid/:departmentid"
                element={<AdminDepartmentPage />}
              />
              <Route
                path="admincollege/:collegeid/:departmentid/:classid"
                element={<ClassPage />}
              />
              <Route path="createcollege" element={<CreateCollegePage />} />
              <Route path="editcollege" element={<EditCollegePage />} />
              <Route path="editclass/:classid" element={<EditClassPage />} />
              <Route path="createdepartment" element={<CreateDepartmentPage />} />
              <Route
                path="editdepartment/:departmentid"
                element={<EditDepartmentPage />}
              />
              <Route path="createclass" element={<CreateClassPage />} />
              <Route path="adminsettings/done" element={<AdminSettingsPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="edituser/:id" element={<EditUserPage />} />
              <Route path="manageusers" element={<ManageUsersPage />}></Route>
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes >
    </UserContextProvider>
  );
};

export default RoutesList;
