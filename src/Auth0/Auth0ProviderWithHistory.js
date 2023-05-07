import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line
export const Auth0ProviderWithHistory = ({ children }) => {
    const navigate = useNavigate()

    const domain = process.env.REACT_APP_AUTH0_DOMAIN
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
    // const a}

    const onRedirectCallback = (appState) => {
        // navigate(appState?.returnTo || window.location.pathname)
        navigate(appState?.returnTo || '/')
    }

    /*
    if (!(domain && clientId && audience)) {
        return null
    }
    */

    return (
        <Auth0Provider
        domain={domain}
        clientId={clientId}
        // audience={audience}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        >
        {children}
        </Auth0Provider>
    )
}