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

    const createLog = async (datos) => {
        const config = {
            url: `${apiServerUrl}/api/logs/create`,
            method: 'POST',
            headers: {},
            data: datos
        }

        const data = await makeRequest({config})
        console.log('Registrado correctamente')
    }

    const getLogs = async (id_session) =>{
        const config = {
            url: `${apiServerUrl}/api/logs/session/${id_session}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})
        return data;
    }

    return {
        createLog,
        getLogs
    }
}