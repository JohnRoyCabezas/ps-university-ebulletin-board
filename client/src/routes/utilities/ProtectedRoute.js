import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const user = Cookies.get('user') && JSON.parse(Cookies.get('user') || '{}');

  return allowedRoles?.includes(user?.role_user?.role_id) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
