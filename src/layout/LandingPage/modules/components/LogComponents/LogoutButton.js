import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export default function LogOutButton(){

    const { logout } = useAuth0()

    return (
        <>
            <button type = "button" onClick = { () => logout()}>Logout</button>
        </>
    )
}