import { Route, Routes } from "react-router-dom";
import React from 'react';

import AdminAnnouncementPage from "../pages/AdminAnnouncementPage";
import AnnouncementPage from "../pages/AnnouncementPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/adminannouncement" element={<AdminAnnouncementPage />} />
      <Route path="/announcement" element={<AnnouncementPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />}></Route>
    </Routes>
  )
}

export default RoutesList