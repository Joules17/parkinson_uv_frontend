// assets
import { LineChartOutlined, PlayCircleOutlined, TeamOutlined, UserOutlined, BookOutlined, AppstoreAddOutlined, FileDoneOutlined} from '@ant-design/icons';

// icons
const icons = {
    LineChartOutlined,
    PlayCircleOutlined,
    TeamOutlined,
    UserOutlined,
    BookOutlined,
    AppstoreAddOutlined,
    FileDoneOutlined
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
            icon: icons.LineChartOutlined,
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
        {
            id: 'pacient',
            title: 'Pacientes',
            type: 'item',
            url: '/patients-page',
            icon: icons.TeamOutlined,
            breadcrumbs: false
        },
        {
            id: 'library',
            title: 'Biblioteca',
            type: 'item',
            url: '/library-page',
            icon: icons.BookOutlined,
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
            title: 'Galería de Juegos',
            type: 'item',
            url: '/games-page',
            icon: icons.PlayCircleOutlined,
            breadcrumbs: false
        },
        {
            id: 'sessions',
            title: 'Sesiones',
            type: 'item',
            url: '/sessions-page',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard_doctor;
