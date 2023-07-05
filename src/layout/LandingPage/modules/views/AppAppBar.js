import { useState, useEffect } from 'react';
import { Link as LinkRouter } from 'react-router-dom';

// auth 0
import { useAuth0 } from '@auth0/auth0-react'

// hooks
import { useExternalApi } from 'hooks/accountResponse'

// mui
import { Button, Toolbar, AppBar, Box, Grid, IconButton, Menu, MenuItem } from '@mui/material';

// assets imports
import brain_icon from './img_aux/brainy.svg';
import { MenuOutlined } from '@ant-design/icons';
const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const [navbar, setNavbar] = useState(false);
  const [anchored, setAnchored] = useState(null);
  const [open, setOpen] = useState(false);
  const { getInfoAccount } = useExternalApi()
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();
  // aux var for logging
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      getInfoAccount(user.sub).then((data) => {
        // eslint-disable-next-line
        console.log('Hola ', user.name, ' tu tipo sera guardado:', data.id_type, user.picture)
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

  const handleMenu = (event) => {
    if (open) {
      setAnchored(null)
    } else {
      setAnchored(event.currentTarget);
    }
    setOpen(!open)
  };

  return (
    <div>
      <AppBar position='fixed' elevation={navbar ? 5 : 0} style={{ backgroundColor: "#ffffff" }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Button
                variant="h6"
                underline="none"
                component={LinkRouter}
                to={'/'}
                startIcon={<img src={brain_icon} alt="Parkinson SVG" width="24" height="24" />}
                sx={{ fontSize: 22, fontWeight: 'bold', color: "#000000" }}
              >
                {'ParkinsonUV'}
              </Button>
            </Grid>
            <Grid item>
              {!isAuthenticated &&
                <>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', display: { xs: 'none', sm: 'flex' } }}>
                    <Button
                      color="inherit"
                      variant="h6"
                      underline="none"
                      component={LinkRouter}
                      onClick={() => {
                        loginWithRedirect({
                          screen_hint: 'signup',
                          appState: {
                            returnTo: '/register'
                          }
                        })
                      }}
                      sx={{ rightLink, fontSize: 18, color: "#000000" }}
                    >
                      {'Registrarse'}
                    </Button>
                    <Button
                      color="inherit"
                      variant="h6"
                      underline="none"
                      component={LinkRouter}
                      onClick={() => {
                        loginWithRedirect()
                      }}
                      sx={{ rightLink, fontSize: 18, color: "#000000" }}
                    >
                      {'Iniciar Sesión'}
                    </Button>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', display: { xs: 'flex', sm: 'none' } }}>
                    <IconButton color="inherit" onClick={handleMenu} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                      <MenuOutlined style={{ color: '#000000' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchored}
                      open={open}
                      onClose={handleMenu}
                      sx={{ zIndex: 9999 }}
                    >
                      <MenuItem onClick={() => {
                        handleMenu()
                        loginWithRedirect({
                          screen_hint: 'signup',
                          appState: {
                            returnTo: '/register'
                          }
                        })
                      }}
                      >
                        Registrarse
                      </MenuItem>
                      <MenuItem onClick={() => {
                        loginWithRedirect();
                        handleMenu()
                      }}>Iniciar Sesión</MenuItem>
                    </Menu>
                  </Box>
                </>
              }
              {
                isAuthenticated &&
                <>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', display: { xs: 'none', sm: 'flex' } }}>
                    <Button
                      color="inherit"
                      variant="h6"
                      underline="none"
                      component={LinkRouter}
                      disabled={!logged}
                      to={'dashboard'}
                      sx={{ rightLink, fontSize: 18, color: "#000000" }}
                    >
                      {'Dashboard'}
                    </Button>
                    <Button
                      variant="h6"
                      underline="none"
                      onClick={() => logout()}
                      sx={{ ...rightLink, fontSize: 18, color: "#000000" }}
                    >
                      {'Cerrar Sesion'}
                    </Button>
                  </Box>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', display: { xs: 'flex', sm: 'none' } }}>
                    <IconButton color="inherit" onClick={handleMenu} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                      <MenuOutlined style={{ color: '#000000' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchored}
                      open={open}
                      onClose={handleMenu}
                      sx={{ zIndex: 9999 }}
                    >
                      <MenuItem component={LinkRouter} disabled={!logged} to={'dashboard'}
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem onClick={() => logout()}>Cerrar Sesión</MenuItem>
                    </Menu>
                  </Box>
                </>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
