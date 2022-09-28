import { Route, Routes } from "react-router-dom";
import React from 'react';

import LoginPage from "../pages/LoginPage";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  )
}

export default RoutesList