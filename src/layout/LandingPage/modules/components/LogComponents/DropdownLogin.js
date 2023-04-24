import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { ButtonT } from './butt-titulo'
import { useAuth0 } from '@auth0/auth0-react'

export default function DropdownLogin () {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const { loginWithRedirect } = useAuth0(); 
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    console.log(window.location.href)

    return (
        <div>
        <Button
            underline="none"
            id="login-button"
            aria-controls={open ? 'login-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx = {{fontSize: 18, color: "#000000", marginLeft: '2rem'}}
        >
            Ingresar
        </Button>
        <Menu
            id="login-menu"
            aria-labelledby="login-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
            }}
        >
            <ButtonT titulo="Terapeuta"  />
            <ButtonT titulo="Paciente" />

        </Menu>
        </div>
    )
}