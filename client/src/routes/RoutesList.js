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
import AdminSettingsPage from '../pages/AdminSettingsPage';
import ManageUsersPage from "../pages/ManageUsersPage";
import Unauthorized from '../pages/Unauthorized';
import ProtectedRoute from './utilities/ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';

const RoutesList = () => {
  const ROLES = {
    Student: 1,
    Admin: 2,
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="unauthorized" element={<Unauthorized />}></Route>
      <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin, ROLES.Student]} />}>
        <Route path="announcement" element={<AnnouncementPage />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin]} />}>
        <Route path="adminannouncement" element={<AdminAnnouncementPage />} />
        <Route path="createcollege" element={<CreateCollegePage />} />
        <Route path="editcollege" element={<EditCollegePage />} />
        <Route path="createdepartment" element={<CreateDepartmentPage />} />
        <Route path="createclass" element={<CreateClassPage />} />
        <Route path="adminsettings" element={<AdminSettingsPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="manageusers" element={<ManageUsersPage />}></Route>
      </Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};

export default RoutesList;
