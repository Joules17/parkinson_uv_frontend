// assets
import { DashboardOutlined, PlayCircleOutlined } from '@ant-design/icons';


// icons
const icons = {
    DashboardOutlined,
    PlayCircleOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
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
    ]
};

export default dashboard;
