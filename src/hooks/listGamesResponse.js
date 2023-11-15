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
    

    const getListGamesAll = async (setListGames) => {
        const config = {
            url: `${apiServerUrl}/api/list/retreive/`,
            method: 'GET',
            headers: {},
            data: {}
        }
        const data = await makeRequest({config})
        
        // 
        setListGames(data)
    }

    const getListGamesDetailed = async (id, setListGames) => {
        const config = {
            url: `${apiServerUrl}/api/list/retreive/therapist/${id}`,
            method: 'GET',
            headers: {},
            data: {}
        }
        const data = await makeRequest({config})

        // 
        setListGames(data)
    }

    const deleteListGames = async (id) => {
        const config = {
            url: `${apiServerUrl}/api/list/delete/${id}`,
            method: 'DELETE',
            headers: {},
            data: {}
        }

        await makeRequest({config}); 
    }; 

    const checkListGames = async (id) => {
        const config = {
            url: `${apiServerUrl}/api/list/check/${id}`,
            method: 'GET',
            headers: {},
            data: {}
        }
        
        const data = await makeRequest({config});
        return data.is_assigned; 
    }; 

    const getListGames = async (id, setListGames) => {
        const config = {
            url: `${apiServerUrl}/api/list/retreive/${id}`,
            method: 'GET',
            headers: {},
            data: {}
        }
        const data = await makeRequest({config})

        setListGames(data)
    }

    const updateSettingGameList = async (id_list, datos) => {
        const config = {
            url: `${apiServerUrl}/api/game_list/update/setting/${id_list}`,
            method: 'PUT',
            headers: {},
            data: {
                "setting": datos
            }
        }
        await makeRequest({config})

        // console.log(data)
    }

    const createList = async (datos, setLog) => {
        const config = {
            url: `${apiServerUrl}/api/list/create`,
            method: 'POST',
            headers: {},
            data: datos
        }

        try {
            await makeRequest({config});
            // La petición se realizó con éxito
            setLog(true);
            console.log('Registrado correctamente');
        } catch (error) {
            setLog(false); 
            console.error('Error al realizar la petición:', error);
        }
    }

    return {
        getListGamesAll,
        getListGamesDetailed,
        getListGames,
        updateSettingGameList,
        createList, 
        deleteListGames, 
        checkListGames
    }
}