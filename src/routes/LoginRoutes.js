import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// Auth0 Imports 
import AuthRedirect from 'Auth0/AuthRedirect';

const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthRedirect />
        },
        {
            path: 'register',
            element: <AuthRedirect Component={AuthRegister}/>
        }
    ]
};

export default LoginRoutes;
