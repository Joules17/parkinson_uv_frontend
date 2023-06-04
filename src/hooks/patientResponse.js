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

    const getPatient = async (id, setPatient) => {

        const config = {
            url: `${apiServerUrl}/api/patient/retreive/${id}`,
            method: 'GET',
            headers: {},
            data: {}
        }

        const data = await makeRequest({config})

        // console.log(data)
        setPatient(data)

    }

    const createPatient = async (datos, id, email) => {

        const config = {
            url: `${apiServerUrl}/api/patient/create`,
            method: 'POST',
            headers: {
            },
            data: {
                "user_id": id,
                "id_type": 2,
                "name": datos.name,
                "lastname": datos.lastname,
                "email": email, 
                "cell": datos.cell, 
                "age" : datos.age, 
                "gender" : datos.gender, 
                "id_parkinson_phase" : 1,
                "id_therapist" : 111
            }
        }

        const data = await makeRequest({config})
        console.log(data)
    }

    const updatePatient = async (datos, id, setMensaje) => {

        const config = {
            url: `${apiServerUrl}/api/patient/update/${id}`,
            method: 'PUT',
            headers: {
            },
            data: {
                "id_type": 2,
                "name": datos.name,
                "lastname": datos.lastname,
                "cell": datos.cell, 
                "age" : datos.age, 
                "gender" : datos.gender, 
                "email" : datos.email,
                "id_parkinson_phase" : datos.id_parkinson_phase,
                "id_therapist" : datos.id_therapist
            }
        }
        const data = await makeRequest({config})

        console.log(data)
        
        setMensaje('Se ha actualizado')
    }

    const createPatientAccount = async (datos, id, email, setMensaje) => {

        const config = {
            url: `${apiServerUrl}/api/account/create`,
            method: 'POST',
            headers: {},
            data: {
                "user_id": id,
                "id_type": 2,
                "password": "basic",
                "email": email,
                "user_status": true
            }
        }

        const data = await makeRequest({config})

        console.log(data)

        createPatient(datos, id, email)
        setMensaje('Registrado correctamente')
    }
    
    return {
        getPatient,
        createPatientAccount,
        createPatient,
        updatePatient
    }
}

