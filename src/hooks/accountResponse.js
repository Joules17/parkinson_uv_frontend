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
    

    const getInfoAccount = async (id) => {

        const config = {
            url: `${apiServerUrl}/api/auth/retrieve`,
            method: 'POST',
            headers: {},
            data: {
                "user_id" : id
            }
        }

        const data = await makeRequest({config})

        return data
    }

    return {
        getInfoAccount
    }
}