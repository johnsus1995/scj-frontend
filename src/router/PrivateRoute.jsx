import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const isAuthenticated = () => {
  return localStorage.getItem("scjAuthToken") !== null;
};

const PrivateRoute = () => {
  return isAuthenticated() ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
