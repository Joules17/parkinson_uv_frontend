// react import
import { useState } from 'react';

// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import UserContext from 'context/user.context';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
    const [userType, setUserType] = useState('')
    return(
        <UserContext.Provider value = {[userType, setUserType]}>
            <ThemeCustomization>
                <ScrollTop>
                    <Routes />
                </ScrollTop>
            </ThemeCustomization>
        </UserContext.Provider>
    ); 
}
