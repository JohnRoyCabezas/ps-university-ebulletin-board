import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLoading from "../pages/components/loading/PageLoading";
import useAuth from "./useAuth";

const withAuth = (Component) => {
  const AuthComponent = (props) => {
    const { authenticated, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      const path = user && user.is_admin ? "/admin/dashboard" : "/dashboard";
      if (
        authenticated === false &&
        location.pathname !== "/" &&
        location.pathname !== "/register"
      ) {
        navigate("/");
      } else if (
        authenticated === true &&
        (location.pathname === "/" || location.pathname === "/register")
      ) {
        navigate(path);
      }
    }, [authenticated, user, location.pathname, navigate]);

    return (
      <>{authenticated === null ? <PageLoading /> : <Component {...props} />}</>
    );
  };

  return AuthComponent;
};

export default withAuth;
