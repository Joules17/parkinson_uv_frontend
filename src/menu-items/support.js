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
    title: 'Ayuda',
    type: 'group',
    children: [
        {
            id: 'configuration',
            title: 'Configuración',
            type: 'item',
            url: '/sample-page',
            icon: icons.SettingOutlined
        },
        {
            id: 'logOut',
            title: 'Salir',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/mantis-react/',
            icon: icons.LogoutOutlined,
            external: true,
            target: true
        }
    ]
};

export default support;
