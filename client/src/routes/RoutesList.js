import { Route, Routes } from "react-router-dom";
import React from 'react';

import AdminAnnouncementPage from "../pages/AdminAnnouncementPage";
import AnnouncementPage from "../pages/AnnouncementPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import CreateDepartmentPage from "../pages/CreateDepartmentPage";
import AdminSettingsPage from "../pages/AdminSettingsPage";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/adminannouncement" element={<AdminAnnouncementPage />} />
      <Route path="/createdepartment" element={<CreateDepartmentPage />} />
      <Route path="/announcement" element={<AnnouncementPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/adminsettings" element={<AdminSettingsPage />} />
    </Routes>
  )
}

export default RoutesList