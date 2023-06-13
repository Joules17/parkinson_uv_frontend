import { useState, useEffect } from 'react';
import { Link as LinkRouter } from 'react-router-dom';

// auth 0 
import { useAuth0 } from '@auth0/auth0-react'

// hooks
import { useExternalApi } from 'hooks/accountResponse'

// mui 
import { Button, Toolbar, AppBar, Box } from '@mui/material'; 

// assets imports 
import brain_icon from './img_aux/brainy.svg'; 
const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const [navbar, setNavbar] = useState(false)
  const { getInfoAccount } = useExternalApi()
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0(); 
  // aux var for logging
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      getInfoAccount(user.sub).then((data) => { 
        // eslint-disable-next-line
        console.log('Hola ', user.name, ' tu tipo sera guardado:', data.id_type)
        window.localStorage.setItem('tipo', data.id_type)
        setLogged(true)
      })
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  // console.log(loginWithRedirect)
  const changeBackground = () => {
    window.scrollY >= 150 ? setNavbar(true) : setNavbar(false)
  }

  window.addEventListener('scroll', changeBackground)

  return (
    <div>
      <AppBar position= 'fixed' elevation = { navbar ? 5 : 0} style = {{ backgroundColor: navbar ? "#ffffff" : 'transparent' }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }} />
          <Button
            variant="h6"
            underline="none"
            component = {LinkRouter}
            to = {'/'}
            startIcon={<img src={brain_icon} alt="Parkinson SVG" width="24" height="24"/>}
            sx={{ fontSize: 22, fontWeight: 'bold', color: "#000000"}}
          >
            {'ParkinsonUV'}
          </Button>
          {!isAuthenticated && 
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                color="inherit"
                variant="h6"
                underline="none"
                component = {LinkRouter}
                onClick = {() => {
                  loginWithRedirect({
                    screen_hint: 'signup', 
                    appState: {
                      returnTo: '/register'
                    }
                  })
                }}
                sx={{rightLink, fontSize: 18, color: "#000000"}}
                >
                  {'Registrarse'}
              </Button>
              <Button
                color="inherit"
                variant="h6"
                underline="none"
                component = {LinkRouter}
                onClick = {() => {
                  loginWithRedirect()
                }}
                sx={{rightLink, fontSize: 18, color: "#000000"}}
                >
                  {'Iniciar Sesión'}
              </Button>
            </Box>
          }
          {
            isAuthenticated && 
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                color="inherit"
                variant="h6"
                underline="none"
                component = {LinkRouter}
                disabled = {!logged}
                to = {'dashboard'}
                sx={{rightLink, fontSize: 18, color: "#000000"}}
                >
                  {'Dashboard'}
                </Button>
                <Button
                  variant="h6"
                  underline="none"
                  onClick = { () => logout()}
                  sx={{ ...rightLink, fontSize: 18, color: "#000000" }}
                >
                  {'Cerrar Sesion'}
                </Button>
              </Box>
          }
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
