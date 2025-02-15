import { FC, lazy } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { routeList } from '@/data/constant/navs';
import LayoutComponent from '@/layout';
import AuthLayout from '@/layout/authLayout';
import { Register } from '@/pages';
import Login from '@/pages/login';

const NotFound = lazy(() => import('@/pages/not-found'));

const routes = [
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />,
      },
      ...routeList,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '*',
        element: <h1>Not found</h1>,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routes);

  return element;
};

export default RenderRouter;
