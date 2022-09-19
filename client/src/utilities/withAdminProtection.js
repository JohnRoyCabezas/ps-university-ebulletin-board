import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const withAdminProtection = (Component) => {
  const AuthComponent = (props) => {
    const { authenticated, user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
      if (user && !user.is_admin) {
        navigate("/dashboard");
      }
    }, [authenticated, user, navigate]);

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAdminProtection;
