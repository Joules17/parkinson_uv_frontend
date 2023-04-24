import axios from 'axios'
import { useEnv } from '../context/env.context'

export const useExternalApi = () => {

    const { apiServerUrl } = useEnv()

    const makeRequest = async (options) => {

        try {
            const response = await axios(options.config)
            const { data } = response

            return data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data
            }

            return error.message
        }
    }

    const getUser = async (id, setUser) => {

        const config = {
            url: `${apiServerUrl}/api/user/retrieve/${id}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})

        // console.log(data)
        setUser(data)

    }

    const createUser = async (datos, id) => {

        const config = {
            url: `${apiServerUrl}/api/user/create`,
            method: 'POST',
            headers: {
            },
            data: {
                "user_id": id,
                "user_type": 3,
                "name": datos.nombre,
                "city": datos.ciudad,
                "birth_date": datos.fecha,
                "sex": datos.sexo
            }
        }

        const data = await makeRequest({config})

        console.log(data)

    }

    const updateUser = async (datos, id, tipo, setMensaje) => {

        const config = {
            url: `${apiServerUrl}/api/user/update/${id}`,
            method: 'PUT',
            headers: {
            },
            data: {
                "user_type": tipo,
                "name": datos.nombre,
                "city": datos.ciudad,
                "birth_date": datos.fecha,
                "sex": datos.sexo
            }
        }
        const data = await makeRequest({config})

        console.log(data)
        
        setMensaje('Se ha actualizado')

    }

    const createAccount = async (datos, id, email, setMensaje) => {

        const config = {
            url: `${apiServerUrl}/api/account/create`,
            method: 'POST',
            headers: {},
            data: {
                "user_id": id,
                "user_type": 3,
                "password": "basic",
                "email": email,
                "user_status": true
            }
        }

        const data = await makeRequest({config})

        console.log(data)

        createUser(datos, id)

        setMensaje('Registrado correctamente')

    }
    
    return {
        getUser,
        createAccount,
        createUser,
        updateUser
    }
}

