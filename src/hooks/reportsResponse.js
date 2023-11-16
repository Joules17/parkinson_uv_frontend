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

    const GetReportsByTherapistDetailed = async (id_therapist, setReports) => {
        const config = {
            url: `${apiServerUrl}/api/reports/retreive/therapist/${id_therapist}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})

        setReports(data)
    }

    
    return {
        GetReportsByTherapistDetailed
    }
}