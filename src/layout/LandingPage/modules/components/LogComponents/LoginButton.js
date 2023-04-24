import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton(){

    const { loginWithRedirect } = useAuth0()
    console.log(window.location.href, process.env.REACT_APP_AUTH0_DOMAIN, process.env.REACT_APP_AUTH0_CLIENT_ID, 'holi')

    return (
        <>
            <button type = "button" onClick = { () => loginWithRedirect()}>Login</button>
        </>
    )
}