import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));
const Users = lazy(() => import('@/pages/users'));
const Todos = lazy(() => import('@/pages/todos'));
const Register = lazy(() => import('@/pages/auth/register'));
const Editor = lazy(() => import('@/pages/editor'));

export { Home, Users, Todos, Register,Editor };
