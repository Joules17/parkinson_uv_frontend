// assets
import { LineChartOutlined, PlayCircleOutlined, UserOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';

// icons
const icons = {
    LineChartOutlined,
    PlayCircleOutlined,
    UserOutlined,
    UnorderedListOutlined,
    AppstoreOutlined,
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
            icon: icons.LineChartOutlined,
            breadcrumbs: false
        },
        {
            id: 'activities',
            title: 'Actividades',
            type: 'item',
            url: '/my-activities-page',
            icon: icons.AppstoreOutlined,
            breadcrumbs: false
        },
        {
            id: 'games',
            title: 'Galería de Juegos',
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