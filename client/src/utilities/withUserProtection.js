import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const withUserProtection = (Component) => {
  const AuthComponent = (props) => {
    const { authenticated, user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
      if (user && user.is_admin) {
        navigate("/admin/dashboard");
      }
    }, [authenticated, user, navigate]);

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withUserProtection;
