import * as React from 'react';
import { useForm } from 'react-hook-form';
import {  useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from './modules/components/AppBar';
import Toolbar from './modules/components/Toolbar';
import Typography from './modules/components/Typography';
import AppForm from './modules/views/AppForm';
// import withRoot from './modules/withRoot';
import AppFooter from './modules/views/AppFooter';

import { useExternalApi } from '../../hooks/UserResponse';

function SignUp() {
  const { handleSubmit: registerSubmit, register: registro } = useForm()
  const { user } = useAuth0();
  const nav = useNavigate()

  const { createAccount } = useExternalApi()

  const [mensaje, setMensaje] = useState('Registrarme')

  const onSubmit = data => {
    console.log(data)
    setMensaje('Registrando...')
    createAccount(data, user.sub, user.email, setMensaje)
    setTimeout(() => {
    nav(`/`)
    }, 2000)
  }

  const sexo = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' },
    { value: 'Otro', label: 'Otro' },
  ]

  return (
      <>
        <AppForm >
          <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'center' }}>
              <Box sx={{ justifyContent: 'center'}}>
              <Button
                variant="h6"
                underline="none"
                color="inherit"
                component = {LinkRouter}
                to = {'/'}
                sx={{ fontSize: 24 }}
              >
                {'ScrapWare'}
              </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Registro
          </Typography>
          <Typography variant="body2" align="center">
              ScrapWare
          </Typography>
          <div>
            <form onSubmit = {registerSubmit(onSubmit)}>
              <TextField
                label="Nombre"
                {...registro('nombre', { required: true })}
                inputProps={{
                  maxLength: 50
                }}
                fullWidth
                sx={{ mx: 4, my: 2 }}
              />
              <TextField
                label="Ciudad"
                {...registro('ciudad', { required: true })}
                inputProps={{
                  maxLength: 50
                }}
                fullWidth
                sx={{ mx: 4, my: 2}}
              />
              <TextField
                label="Fecha de nacimiento"
                type="date"
                InputLabelProps={{ shrink: true }} 
                {...registro('fecha', { required: true })}
                inputProps={{
                  maxLength: 50
                }}
                fullWidth
                sx={{ mx: 4, my: 2}}
              />
              <TextField
                label="Sexo"
                select
                defaultValue = {''}
                {...registro('sexo', { required: true })}
                fullWidth
                sx={{ mx: 4, my: 2 }}
              >
                {sexo.map((el) => (
                <MenuItem key={el.value} value={el.value}>
                  {el.label}
                </MenuItem>
                ))}
              </TextField>
            </form>
            <Button sx={{ 
              ml: { xs: 4, md: 4}, 
              mr: { xs: 4, md: 4}, 
              my: 2, 
              ':hover' : { bgcolor: '#155FA8', color:'white'} }} 
              fullWidth 
              variant='contained' 
              onClick={registerSubmit(onSubmit)} 
            >
              {mensaje}
            </Button>
          </div>
        </AppForm>
        <AppFooter />
      </>
  );
}

export default SignUp;
