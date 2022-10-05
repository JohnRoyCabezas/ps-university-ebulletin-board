import { Route, Routes } from "react-router-dom";
import React from 'react';

<<<<<<< HEAD
import AnnouncementPage from "../pages/AnnouncementPage";
=======
import AdminAnnouncementPage from "../pages/AdminAnnouncementPage";
import AnnouncementPage from "../pages/AnnouncementPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
>>>>>>> dev-branch

const RoutesList = () => {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<AnnouncementPage />} />
=======
      <Route path="/adminannouncement" element={<AdminAnnouncementPage />} />
      <Route path="/announcement" element={<AnnouncementPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />}></Route>
>>>>>>> dev-branch
    </Routes>
  )
}

export default RoutesList;
