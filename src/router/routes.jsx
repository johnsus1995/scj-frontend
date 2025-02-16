import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import Stats from "../pages/Stats";
import PrivateRoute from "@/router/PrivateRoute";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AuthLayout from "@/components/layout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <Register />
      </AuthLayout>
    ),
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { path: "", element: <Home /> },
      { path: "stats", element: <Stats /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
