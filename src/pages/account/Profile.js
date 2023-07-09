// react
import { useEffect, useState } from 'react'; 

// prop
// import PropTypes from 'prop-types';

// material-ui
import { Typography, Stack, Grid, Avatar, Button } from '@mui/material';

// auth 0 imports 
import { useAuth0 } from '@auth0/auth0-react';

// project import
import MainCard from 'components/MainCard';
import { useExternalApi as usePatientResponse } from 'hooks/patientResponse'
import { useExternalApi as useTherapistResponse }  from 'hooks/therapistResponse'

// profiles supports
// import ProfilePatient from 'components/ProfilePatient'; 
import ChargingCard from 'components/ChargingCard'; 

// forms 
import ProfileTherapistForm from 'components/Profile/ProfileTherapistForm';

// cards
import ProfileTherapistCard from 'components/Profile/ProfileTherapistCard';

import PatientProfile from './components/PatientProfile';

// ==============================|| PROFILE PAGE ||============================== //

const Profile = () => {
    // auth 0 functions --------------------------------------------------
    const { user } = useAuth0()

    // api responses use-states -------------------------------------------
    const [userCharged, setUserCharged] = useState(undefined)

    // api request -------------------------------------------------------
    const { getPatientDetailed, updatePatient } = usePatientResponse()
    const { getTherapistDetailed, updateTherapist } = useTherapistResponse()

    // variables ---------------------------------------------------------
    const [tipo, setTipo] = useState(undefined)
    const [editMode, setEditMode] = useState(false)

    // mensaje de actualizacion
    const [mensaje, setMensaje] = useState('Actualizar')

    // ====================     HANDLERS     ==================== //

    // editModeHandler --------------------------------------------------
    const handleEdit = () => {
        if (editMode) {
            registerSubmit(onSubmit)
        }
        setEditMode(true); 
        // values...
    }

    const handleExit = () => {
        setEditMode(false); 
    }
    // inicializador -----------------------------------------------------
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        var tipo_local = window.localStorage.getItem('tipo')
        setTipo(tipo_local)
        if (tipo_local === '1') {
            getTherapistDetailed(user.sub, setUserCharged)
        } else {
            getPatientDetailed(user.sub, setUserCharged)
        }
        // eslint-disable-next-line
    }, [])

    // submit ------------------------------------------------------------
    const onSubmit = (data) => {
        console.log(data, 'me llego esto')
        setMensaje('Actualizando...')
        data.email = userCharged.email
        if (tipo === '1') {
            updateTherapist(data, user.sub, setMensaje)
            .then(() => {
                getTherapistDetailed(user.sub, setUserCharged)
            })
        } else {
            data.id_parkinson_phase = userCharged.id_parkinson_phase_id
            data.id_therapist = userCharged.id_therapist_id
            updatePatient(data, user.sub, setMensaje)
            .then(() => {
                getPatientDetailed(user.sub, setUserCharged)
            })
        }
        console.log(mensaje)
        // window.location.reload() // buscar forma de quitarlo mas adelante...
        setEditMode(false); 
    }


    if (userCharged === undefined) {
        // charging component
        return(
            <ChargingCard />
        )
    } else  if (tipo === '1'){
        console.log(userCharged.user_picture)
        return(
            <MainCard imgUrl="https://wallpaperset.com/w/full/d/0/9/522932.jpg" imageHeight="200px" contentSX={{ p: 2.25 }}>
            <Grid container alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item sx={{ position: 'relative', zIndex: 2 }}>
                    <Avatar src={userCharged.user_picture} sx={{ width: 100, height: 100, position: 'relative', top: '-40px' }} />
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                    <Stack spacing={0.5} ml={2}>
                        <Typography variant="h6" color="textSecondary" sx={{ position: 'relative', top: '-30px' }}>
                            Terapeuta 
                        </Typography>
                        <Typography variant="h4" color="inherit" sx={{ position: 'relative', top: '-35px' }}>
                            {userCharged.name}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item>
                <Button
                    disableElevation
                    color="primary"
                    onClick={() => { editMode ? null : handleEdit()}}
                    variant="contained"
                    sx={{
                    position: 'relative',
                    top: '-35px',
                    marginLeft: 'auto',
                    }}
                >
                    {editMode ? 'Editando...' : 'Editar'}
                </Button>
                </Grid>
                {
                    editMode ? (
                        <ProfileTherapistForm LABELS = {['Nombre (s)', 'Apellido (s)', 'Teléfono']} FIELDS = {['name', 'lastname', 'cell']} userCharged = {userCharged} handleExit = {handleExit} onSubmit = {onSubmit} />
                    ) : 
                    (
                        <ProfileTherapistCard LABELS = {['Identificacion', 'Nombre Completo', 'Email', 'Telefono']}  userCharged = {userCharged} />
                    )
                }
                
            </Grid>
        </MainCard>
        );
    } else if (tipo === '2') {
        return (
            <PatientProfile user = {userCharged} img = {'https://wallpaperset.com/w/full/d/0/9/522932.jpg'} handleEdit = {handleEdit} editMode = {editMode} handleExit = {handleExit} onSubmit = {onSubmit}/>
        ); 
    }
}; 

/*
Profile.propTypes = {
    user_id: PropTypes.string
};
*/

export default Profile; 