import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from 'Auth0/ProtectedRoute'; 

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - Pages
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const PatientsPage = Loadable(lazy(() => import('pages/patients/PatientsPage')));
const LibraryPage = Loadable(lazy(() => import('pages/library/Library')));
const GamesPage = Loadable(lazy(() => import('pages/games/Games')));
const RunListGames = Loadable(lazy(() => import('pages/runListGame/runListGame')));

// Phaser Games
const IndexNumbers = Loadable(lazy(() => import('components/exercises/indexNumbers'))); 
const IndexFruits = Loadable(lazy(() => import ('components/exercises/indexFrutas')));
const IndexFrutastic = Loadable(lazy(() =>  import('components/exercises/indexFrutastic'))); 
const IndexArtic = Loadable(lazy(() => import('components/exercises/indexArtic')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <ProtectedRoute component = {MainLayout}/>,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'exercise1',
            element: <IndexNumbers />
        },
        {
            path: 'exercise2',
            element: <IndexNumbers />
        },
        {
            path: 'exercise3',
            element: <IndexFruits />
        },
        {
            path: 'exercise4',
            element: <IndexFrutastic />
        },
        {
            path: 'exercise5',
            element: <IndexArtic />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'patients-page',
            element: <PatientsPage />
        },
        {
            path: 'library-page',
            element: <LibraryPage />
        },
        {
            path: 'games-page',
            element: <GamesPage />
        },
        {
            path: 'run-list-games',
            element: <RunListGames />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
