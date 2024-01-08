// proptypes
import PropTypes from 'prop-types';

// api
import { useExternalApi as usePatientResponse } from 'hooks/patientResponse'
import { useExternalApi as useTherapistResponse } from 'hooks/therapistResponse'

// auth0
import { useAuth0 } from '@auth0/auth0-react'

// mui 
import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import Dot from 'components/@extended/Dot';

// ================================== ASSETS ==============================================
import { UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';

export default function AssignStatus({ user_id, value, parkinson_phase, setList, setLoading }) {
    // api 
    const { updatePatientAssignee } = usePatientResponse()
    const { getTherapistPatients } = useTherapistResponse()

    // auth 0
    const { user } = useAuth0()

    const handleAssignClick = (id_user, id_therapist, id_parkinson_phase, setList) => {
        setLoading('Cargando...')
        var data = {
            id_therapist: id_therapist,
            id_parkinson_phase: id_parkinson_phase
        }

        updatePatientAssignee(id_user, data)
            .then(() => {
                getTherapistPatients(user.sub, setList)
                setLoading('Usuarios')
            })
    }

    let color;
    let title;
    let titleSuggest;
    if (value === '111') {
        color = 'warning';
        title = 'No Asignado';
        titleSuggest = 'Asignarme este paciente';
    } else {
        color = 'success';
        title = 'Asignado';
        titleSuggest = 'Desasignarme este paciente';
    }
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
            <Tooltip title={titleSuggest}>
                {value === '111' ?
                    <IconButton style={{ color: 'green' }} onClick={() => handleAssignClick(user_id, user.sub, parkinson_phase, setList)} >
                        <UserAddOutlined />
                    </IconButton>
                    :
                    <IconButton style={{ color: 'red' }} onClick={() => handleAssignClick(user_id, '111', parkinson_phase, setList)} >
                        <UserDeleteOutlined />
                    </IconButton>
                }
            </Tooltip>
        </Stack>
    );
};

AssignStatus.propTypes = {
    user_id: PropTypes.string,
    value: PropTypes.string,
    parkinson_phase: PropTypes.number,
    setList: PropTypes.func,
    setLoading: PropTypes.func
};