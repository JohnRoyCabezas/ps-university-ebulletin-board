import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const {user} = useContext(UserContext);

  return allowedRoles?.includes(user?.role_user?.role_id) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
