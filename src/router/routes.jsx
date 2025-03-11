import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PrivateRoute from "@/router/PrivateRoute";
import ListQuestionsAndAnswers from "@/pages/ListQuestionsAndAnswers";

const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const AuthLayout = lazy(() => import("@/components/layout/AuthLayout"));
const CreateExam = lazy(() => import("@/pages/CreateExam"));
const AddQuestionAndAnswer = lazy(() => import("@/pages/AddQuestionAndAnswer"));
const AttemptExam = lazy(() => import("@/pages/AttemptExam"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthLayout>
          <Register />
        </AuthLayout>
      </Suspense>
    ),
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "exams/add-exam",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CreateExam />
          </Suspense>
        ),
      },
      {
        path: "exams/:id/add-question-and-answer",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddQuestionAndAnswer />
          </Suspense>
        ),
      },
      {
        path: "exams/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ListQuestionsAndAnswers />
          </Suspense>
        ),
      },
      {
        path: "exams/:id/attempt",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AttemptExam />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
