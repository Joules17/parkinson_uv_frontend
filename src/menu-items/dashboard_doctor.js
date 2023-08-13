// assets
import { DashboardOutlined, PlayCircleOutlined, UserOutlined, UnorderedListOutlined, AppstoreAddOutlined} from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    PlayCircleOutlined,
    UserOutlined,
    UnorderedListOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== // 

const dashboard_doctor = {
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
            id: 'activities', 
            title: 'Actividades', 
            type: 'item',
            url: '/activities-page',
            icon: icons.AppstoreAddOutlined,
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

export default dashboard_doctor;
