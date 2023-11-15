// assets
import { LogoutOutlined, SettingOutlined  } from '@ant-design/icons';

// icons
const icons = {
    LogoutOutlined,
    SettingOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    title: 'Página Principal',
    type: 'group',
    children: [
        {
            id: 'logOut',
            title: 'Salir al Landing',
            type: 'item',
            url: 'https://www.parkinson-uv.me',
            icon: icons.LogoutOutlined,
            external: true,
            target: true
        }
    ]
};

export default support;
