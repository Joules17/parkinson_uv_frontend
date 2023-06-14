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

    const createTherapistAccount = async (datos, id, email, picture, setMensaje) => {

        const config = {
            url: `${apiServerUrl}/api/account/create`,
            method: 'POST',
            headers: {},
            data: {
                "user_id": id,
                "id_type": 1,
                "document_type" : datos.document_type,
                "document_id" : datos.document_id,
                "user_picture" : picture,
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
    const getTherapist = async (id, setTherapist) => {
        const config = {
            url: `${apiServerUrl}/api/therapist/retreive/${id}`,
            method: 'GET',
            headers: {}, 
            data: {}
        }
        
        const data = await makeRequest({config})
        
        // console.log(data)
        setTherapist(data)
    }

    const getTherapistDetailed = async (id, setTherapist) => {
        const config = {
            url: `${apiServerUrl}/api/therapist/retreive/detailed/${id}`,
            method: 'GET',
            headers: {}, 
            data: {}
        }
        
        const data = await makeRequest({config})
        
        // console.log(data)
        setTherapist(data)
    }

    const getTherapistPatients = async (id_therapist, setPatients) => {
        const config = {
            url: `${apiServerUrl}/api/patient/retreive/therapist/${id_therapist}/`, 
            method: 'GET', 
            headers: {}, 
            data: {}
        }

        const data = await makeRequest({config})
        // console.log(data)
        setPatients(data)
    }

    const updateTherapist = async (datos, id, setMensaje) => {
        const config = {
            url: `${apiServerUrl}/api/therapist/update/${id}`,
            method: 'PUT',
            headers: {},
            data: {
                "id_type": 1, 
                "name": datos.name, 
                "lastname": datos.lastname,
                "cell": datos.cell,
                "email": datos.email
            }
        }
        const data = await makeRequest({config})
        console.log(data)
        setMensaje('Se ha actrualizado')
    }

    return {
        createTherapistAccount, 
        createTherapist, 
        getTherapist, 
        getTherapistPatients,
        updateTherapist, 
        getTherapistDetailed
    }
}