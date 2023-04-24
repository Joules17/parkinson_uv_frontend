import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { ButtonT } from './butt-titulo'

export default function DropdownRegister () {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
        <Button
            underline="none"
            id="signup-button"
            aria-controls={open ? 'sign-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx = {{fontSize: 18, color: "#000000"}}
        >
            Registrarse
        </Button>
        <Menu
            id="sign-menu"
            aria-labelledby="signup-button"
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
            <ButtonT returnTo='/RegistroPaciente' action='signup' titulo="Cliente" />
            <ButtonT returnTo='/RegistroDoctor' action='signup' titulo="Doctor" />
        </Menu>
        </div>
    )
}