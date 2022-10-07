import { Route, Routes } from "react-router-dom";
import React from 'react';

import AdminAnnouncementPage from "../pages/AdminAnnouncementPage";
import AnnouncementPage from "../pages/AnnouncementPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import AdminSettingsPage from "../pages/AdminSettingsPage";
import ErrorPage from "../pages/ErrorPage";
import Cookies from "js-cookie";

const RoutesList = () => {
  const user = Cookies.get('user') && JSON.parse(Cookies.get('user') || '{}');

  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="landing" element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route path="adminannouncement" element={<AdminAnnouncementPage />} />
      <Route path="adminsettings" element={<AdminSettingsPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="announcement" element={<AnnouncementPage />} />
      <Route path="*" element={<ErrorPage />}></Route>
      
    </Routes>
  );
}

export default RoutesList