import { Route, Routes } from "react-router-dom";
import React from 'react';

import RegisterPage from "../pages/RegisterPage";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
    </Routes>
  )
}

export default RoutesList