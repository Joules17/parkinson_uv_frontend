import axios from 'axios'
import { useEnv } from 'context/env.context'

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

    // Creates ----------------------------------------------------------------

    const createTherapistAccount = async (datos, id, email, setMensaje) => {

        const config = {
            url: `${apiServerUrl}/api/account/create`,
            method: 'POST',
            headers: {},
            data: {
                "user_id": id,
                "id_type": 1,
                "password": "basic",
                "email": email,
                "user_status": true
            }
        }

        const data = await makeRequest({config})

        console.log(data)

        createTherapist(datos, id, email)
        setMensaje('Registrado correctamente')
    }

    const createTherapist = async (datos, id, email) => {

        const config = {
            url: `${apiServerUrl}/api/therapist/create`,
            method: 'POST',
            headers: {
            },
            data: {
                "user_id": id,
                "id_type": 1,
                "name": datos.name,
                "lastname": datos.lastname,
                "email": email, 
                "cell": datos.cell
            }
        }

        const data = await makeRequest({config})
        console.log(data)
    }
    //  -----------------------------------------------------------------------


    return {
        createTherapistAccount, 
        createTherapist
    }
}