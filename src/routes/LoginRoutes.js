import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// Auth0 Imports 
import AuthRedirect from 'Auth0/AuthRedirect';

// SignUps 
import SignUp from 'layout/LandingPage/SignUp';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        }, 
        {
            path: 'RegistroPaciente', 
            element: <AuthRedirect Component = {SignUp} tipo = 'Paciente'/>
        }, 
        {
            path: 'RegistroDoctor', 
            element: <AuthRedirect Component = {SignUp} tipo = 'Doctor'/>
        }
    ]
};

export default LoginRoutes;
