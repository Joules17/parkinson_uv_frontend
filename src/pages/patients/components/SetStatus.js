// proptypes
import PropTypes from 'prop-types';

// api
import { useExternalApi as useTherapistResponse } from 'hooks/therapistResponse'
import { useExternalApi as useAccountResponse } from 'hooks/accountResponse'

// auth0
import { useAuth0 } from '@auth0/auth0-react'

// mui
import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import Dot from 'components/@extended/Dot';

// ================================== ASSETS ==============================================
import {  PlayCircleOutlined, PoweroffOutlined } from '@ant-design/icons';

export default function SetStatus ({ user_id, value, setList, setLoading}) {
    // api 
    const { updateStatusAccount } = useAccountResponse()
    const { getTherapistPatients } = useTherapistResponse()

    // auth 0
    const { user } = useAuth0()

    const handleAssignClick = (id_user, value, setList) => {
        setLoading('Cargando...')
        updateStatusAccount(id_user, value)
            .then(() => {
                getTherapistPatients(user.sub, setList)
                setLoading('Usuarios')
            })
    }
    let color;
    let title;
    let titleSuggest;

    if (value) {
        color = 'success';
        title = 'Activo';
        titleSuggest = 'Desactivar Usuario';
    } else {
        color = 'error';
        title = 'Inactivo';
        titleSuggest = 'Activar Usuario';
    }
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
            <Tooltip title = {titleSuggest}>
                <IconButton style={{ color: 'red' }} onClick = {() => handleAssignClick(user_id, !value, setList)}> 
                    {value ? <PoweroffOutlined /> : <PlayCircleOutlined/>}
                </IconButton>
            </Tooltip>
        </Stack>
    );
};

SetStatus.propTypes = {
    value: PropTypes.bool,
    user_id: PropTypes.string, 
    serList: PropTypes.func, 
    setLoading: PropTypes.func
};