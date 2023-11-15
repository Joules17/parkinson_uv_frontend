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

    const updateEndDateSession = async (id_list, datos) => {
        // const config = {
        //     url: `${apiServerUrl}/api/game_list/update/setting/${id_list}`,
        //     method: 'PUT',
        //     headers: {},
        //     data: {
        //         "setting": datos
        //     }
        // }
        // const data = await makeRequest({config})

        // console.log(data)
    }

    const createSession = async (datos) => {
        const config = {
            url: `${apiServerUrl}/api/session/create`,
            method: 'POST',
            headers: {},
            data: datos
        }

        const data = await makeRequest({config})
        console.log('Registrado correctamente')
    }

    const getIdSession = async (id_activity, id_patient) =>{
        const config = {
            url: `${apiServerUrl}/api/session/getId/${id_activity}/${id_patient}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})
        return data;
    }

    return {
        updateEndDateSession,
        createSession,
        getIdSession
    }
}