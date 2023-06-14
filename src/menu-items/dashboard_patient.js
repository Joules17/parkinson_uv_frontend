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

const dashboard_patient = {
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
            id: 'library',
            title: 'Biblioteca',
            type: 'item',
            url: '/exercise2',
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
            id: 'profile',
            title: 'Mi Perfil',
            type: 'item',
            url: '/my-profile',
            icon: icons.UserOutlined,
            breadcrumbs: false
        },
    ]
};

export default dashboard_patient;