// react
import { useEffect, useState } from 'react';

// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menu_items from 'menu-items';

// auth0 
import { useAuth0 } from '@auth0/auth0-react';

// ============================== DRAWER CONTENT - NAVIGATION ============================== //

const Navigation = () => {
    const {isAuthenticated} = useAuth0(); 
    const [menuSelected, setMenuSelected] = useState(menu_items[0])

    useEffect(() => {
        if (window.localStorage.getItem('tipo') === '2') {
            setMenuSelected(menu_items[1])
        } else {
            setMenuSelected(menu_items[0])
        }
    }, [isAuthenticated])

    const navGroups = menuSelected.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;