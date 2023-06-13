// assets
import { DashboardOutlined, PlayCircleOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';


// icons
const icons = {
    DashboardOutlined,
    PlayCircleOutlined,
    UserOutlined,
    UnorderedListOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navegacion',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'pacient',
            title: 'Pacientes',
            type: 'item',
            url: '/patients-page',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
        {
            id: 'library',
            title: 'Biblioteca',
            type: 'item',
            url: '/library-page',
            icon: icons.UnorderedListOutlined,
            breadcrumbs: false
        },
        {
            id: 'games',
            title: 'Games',
            type: 'item',
            url: '/games-page',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'exercise1',
            title: 'Numeros',
            type: 'item',
            url: '/exercise1',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'exercise2',
            title: 'Flechas',
            type: 'item',
            url: '/exercise2',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'exercise3',
            title: 'Frutas Locas',
            type: 'item',
            url: '/exercise3',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'exercise4',
            title: 'Frutastico',
            type: 'item',
            url: '/exercise4',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'exercise5',
            title: 'Flechas Articas',
            type: 'item',
            url: '/exercise5',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'exercise6',
            title: 'Purple Domino', 
            type: 'item',
            url: '/exercise6',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'exercise7',
            title: 'Letra Aventura', 
            type: 'item',
            url: '/exercise7',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'Mi Perfil',
            type: 'item',
            url: '/my-profile',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
    ]
};

export default dashboard;
