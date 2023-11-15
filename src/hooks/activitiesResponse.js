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

    const createActivity = async (datos, id_list, id_patient, id_therapist) => {
        const config = {
            url: `${apiServerUrl}/api/activity/create`,
            method: 'POST',
            headers: {},
            data: {
                "name" : datos.name,
                "description" : datos.description,
                "start_date": datos.start_date,
                "end_date": datos.end_date,
                "status" : 'Pendiente',
                "id_list": id_list,
                "id_patient": id_patient,
                "id_therapist" : id_therapist
            }
        }

        console.log(config.data, 'QUE SUCEDE? ')
        const data = await makeRequest({config})

        console.log('Actividad creada correctamente', data)
    }

    const deleteActivity = async (id) => {
        const config = {
            
            url: `${apiServerUrl}/api/activity/delete/${id}`,
            method: 'DELETE',
            headers: {},
            data: {}
        }

        await makeRequest({config})
    }

    const updateStatusActivity = async (id, status) => {
        const config = {
            url: `${apiServerUrl}/api/activity/update/status/${id}`,
            method: 'PUT',
            headers: {
            },
            data: {
                "status": status
            }
        }
        const data = await makeRequest({config})
        console.log(data)
    }
    
    return {
        createActivity,
        deleteActivity,
        updateStatusActivity
    }
}