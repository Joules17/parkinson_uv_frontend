import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import LobbyRoutes from './LobbyRoutes'; 

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([LobbyRoutes, MainRoutes, LoginRoutes]);
}
