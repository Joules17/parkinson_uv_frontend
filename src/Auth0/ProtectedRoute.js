import { useEffect } from 'react'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
import { useExternalApi } from 'hooks/accountResponse'

// eslint-disable-next-line
export default function ProtectedRoute ({ component, ...args }) {
    const { user, logout } = useAuth0()
    const { getInfoAccount } = useExternalApi()
    const nav = useNavigate()
    useEffect( () => {
        async function fetchData () {
            if (user !== undefined) {
                const tipo = window.localStorage.getItem('tipo')
                getInfoAccount(user.sub).then((data) => {
                    // caso en donde no esta registrado
                    console.log(data.id_type.toString() === tipo)
                    if (data.id_type.toString() === '3') {
                        console.log("No estoy registrado")
                        nav(`/register`)
                        window.localStorage.setItem('isRegistrated', false)
                    }
                    // caso en donde o no coincide el tipo de usuario o no esta activo 
                    else if ((data.id_type.toString() !== tipo || !data.user_status)) {
                        console.log("Me meti donde no era")
                        logout({
                            returnTo: window.location.origin
                        })
                    // caso de ingreso exitoso
                    } else {
                        console.log("Me loguee bien")
                        window.localStorage.setItem('isRegistrated', true)
                    }
                })
            }
        }
        
        fetchData()
        // eslint-disable-next-line
    }, [])
    const Component = withAuthenticationRequired(component,args)
    return ( <Component /> )
}