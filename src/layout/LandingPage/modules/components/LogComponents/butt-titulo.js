import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import MenuItem from '@mui/material/MenuItem'

// eslint-disable-next-line 
export const ButtonT = ({ titulo, action, returnTo }) => {
    const { loginWithRedirect } = useAuth0()

    return (
        <MenuItem className="button__sign-up" variant="outlined" size="small" onClick={() => {
        window.localStorage.setItem('tipo', titulo)
        loginWithRedirect({
            screen_hint: action,
            appState: {
            returnTo
            }
        })
        }}>
        {titulo}
        </MenuItem>

    )
}