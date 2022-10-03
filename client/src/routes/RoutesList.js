import { Route, Routes } from "react-router-dom";
import React from 'react';

import AnnouncementPage from "../pages/AnnouncementPage";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<AnnouncementPage />} />
    </Routes>
  )
}

export default RoutesList;
