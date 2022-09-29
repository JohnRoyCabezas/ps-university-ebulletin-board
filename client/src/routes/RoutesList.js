import { Route, Routes } from "react-router-dom";
import React from 'react';

import AdminAnnouncementPage from "../pages/AdminAnnouncementPage";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminAnnouncementPage />} />
    </Routes>
  )
}

export default RoutesList