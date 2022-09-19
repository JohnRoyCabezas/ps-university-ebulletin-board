import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../utilities/useAuth";
import PageLoading from "../loading/PageLoading";
const ProtectedRoutes = () => {
  const { authenticated, user } = useAuth();
  let output;
  if (authenticated === null) {
    output = <PageLoading />;
  } else {
    if (user) {
      output = <Outlet />;
    } else {
      output = <Navigate replace to={"/"} />;
    }
  }
  return <>{output}</>;
};

export default ProtectedRoutes;
