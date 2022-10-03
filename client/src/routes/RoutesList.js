import { Route, Routes } from "react-router-dom";
import React from 'react';

import AnnouncementPage from "../pages/AnnouncementPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<AnnouncementPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  )
}

export default RoutesList