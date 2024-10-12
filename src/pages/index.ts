import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));
const Users = lazy(() => import('@/pages/users'));
const Register = lazy(() => import('@/pages/auth/register'));
const Editor = lazy(() => import('@/pages/editor'));
const AllExams = lazy(() => import('@/pages/allExams'));

export { Home, Users, Register, Editor, AllExams };
