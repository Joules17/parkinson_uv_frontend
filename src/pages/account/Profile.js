// react
import { useEffect, useState } from 'react'; 

// material-ui
import { Typography, Stack, Grid, Avatar, Button } from '@mui/material';

// auth 0 imports 
import { useAuth0 } from '@auth0/auth0-react';

// project import
import MainCard from 'components/MainCard';
import { useExternalApi as usePatientResponse } from 'hooks/patientResponse'
import { useExternalApi as useTherapistResponse }  from 'hooks/therapistResponse'
import { useExternalApi as useParkinsonPhaseResponse } from 'hooks/parkinsonPhaseResponse';
import { useExternalApi as useAccountResponse } from 'hooks/accountResponse';

// profiles supports
// import ProfilePatient from 'components/ProfilePatient'; 
import ChargingCard from 'components/ChargingCard'; 
import calcularEdad from 'components/handleAge';
// forms 
import ProfileTherapistForm from 'components/Profile/ProfileTherapistForm';
import ProfilePatientForm from 'components/Profile/ProfilePatientForm'; 
// cards
import ProfileTherapistCard from 'components/Profile/ProfileTherapistCard';
// assets 

// ==============================|| PROFILE PAGE ||============================== //

const Profile = () => {
    // auth 0 functions --------------------------------------------------
    const { user } = useAuth0()

    // api responses use-states -------------------------------------------
    const [userCharged, setUserCharged] = useState(undefined)
    const [therapistCharged, setTherapistCharged] = useState(undefined)
    const [parkinsonCharged, setParkinsonCharged] = useState(undefined)
    const [accountCharged, setAccountCharged] = useState(undefined)

    // api request -------------------------------------------------------
    const { getPatient, updatePatient } = usePatientResponse()
    const { getTherapist, updateTherapist } = useTherapistResponse()
    const { getParkinsonPhase } = useParkinsonPhaseResponse()
    const { getAccount } = useAccountResponse()

    // variables ---------------------------------------------------------
    const [edad, setEdad] = useState(undefined)
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
            getTherapist(user.sub, setUserCharged)
        } else {
            getPatient(user.sub, setUserCharged)
        }
        // eslint-disable-next-line
    }, [])

    // id_therapist -----------------------------------------------------
    // search for a therapist in the case of a patient using profile component
    useEffect(() => {
        if (tipo === '2') {
            getTherapist(userCharged.id_therapist, setTherapistCharged),
            getParkinsonPhase(userCharged.id_parkinson_phase, setParkinsonCharged),
            getAccount(user.sub, setAccountCharged), 
            setEdad(calcularEdad(userCharged.age))
        } else if (tipo === '1') {
            setTherapistCharged({})
            setParkinsonCharged({})
            setAccountCharged({})
        }
        // eslint-disable-next-line
    }, [userCharged])

    // submit ------------------------------------------------------------
    const onSubmit = (data) => {
        console.log(data, 'me llego esto')
        setMensaje('Actualizando...')
        data.email = userCharged.email
        if (tipo === '1') {
            updateTherapist(data, user.sub, setMensaje)
        } else {
            data.id_parkinson_phase = userCharged.id_parkinson_phase
            data.id_therapist = userCharged.id_therapist
            updatePatient(data, user.sub, setMensaje)
        }
        console.log(mensaje)
        // window.location.reload() // buscar forma de quitarlo mas adelante...
        setEditMode(false); 
    }


    if (userCharged === undefined || therapistCharged === undefined || parkinsonCharged === undefined || accountCharged === undefined) {
        // charging component
        return(
            <ChargingCard />
        )
    } else  if (tipo === '1'){
        return(
            <MainCard imgUrl="https://wallpaperset.com/w/full/d/0/9/522932.jpg" imageHeight="200px" contentSX={{ p: 2.25 }}>
            <Grid container alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item sx={{ position: 'relative', zIndex: 2 }}>
                    <Avatar src={user.picture} sx={{ width: 100, height: 100, position: 'relative', top: '-40px' }} />
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                    <Stack spacing={0.5} ml={2}>
                        <Typography variant="h6" color="textSecondary" sx={{ position: 'relative', top: '-30px' }}>
                            Terapeuta 
                        </Typography>
                        <Typography variant="h4" color="inherit" sx={{ position: 'relative', top: '-35px' }}>
                            {user.name}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item>
                <Button
                    disableElevation
                    color="primary"
                    onClick={handleEdit}
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
                        <ProfileTherapistCard LABELS = {['Nombre Completo', 'Email', 'Telefono']}  userCharged = {userCharged} />
                    )
                }
                
            </Grid>
        </MainCard>
        );
    } else if (tipo === '2') {
        return (
            <MainCard imgUrl="https://wallpaperset.com/w/full/d/0/9/522932.jpg" imageHeight="200px" contentSX={{ p: 2.25 }}>
                <Grid container alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid item sx={{ position: 'relative', zIndex: 2 }}>
                        <Avatar src={user.picture} sx={{ width: 100, height: 100, position: 'relative', top: '-40px' }} />
                    </Grid>
                    <Grid item sx={{ flexGrow: 1 }}>
                        <Stack spacing={0.5} ml={2}>
                            <Typography variant="h6" color="textSecondary" sx={{ position: 'relative', top: '-30px' }}>
                                Paciente
                            </Typography>
                            <Typography variant="h4" color="inherit" sx={{ position: 'relative', top: '-35px' }}>
                                {user.name}
                            </Typography>
                        </Stack>
                    </Grid>
                     
                    <Grid item>
                    <Button
                        disableElevation
                        color="primary"
                        onClick={handleEdit}
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
                            <ProfilePatientForm userCharged = {userCharged} handleExit = {handleExit} onSubmit = {onSubmit}/>
                        )
                        : (
                            <>
                                <Grid item xs={12} sx={{ marginTop: '20px' }}>
                                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" color="inherit" sx = {{marginLeft: '10px'}} >
                                                Nombre (s)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" color="inherit" sx = {{marginLeft: '10px'}} >
                                                Apellido (s)
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" color="inherit" sx = {{marginLeft: '10px'}} >
                                                Email
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ justifyContent: 'center', mb: '2rem' }}>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {userCharged.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {userCharged.lastname}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {userCharged.email}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" sx = {{marginLeft: '10px'}} >
                                                Teléfono
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" sx = {{marginLeft: '10px'}} >
                                                Edad
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" sx = {{marginLeft: '10px'}} >
                                                Género
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ justifyContent: 'center', mb: '2rem' }}>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {userCharged.cell}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {edad}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {userCharged.gender}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" sx = {{marginLeft: '10px'}} >
                                                Estado
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" sx = {{marginLeft: '10px'}} >
                                                Fase de Parkinson
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h4" sx = {{marginLeft: '10px'}} >
                                                Terapeuta Asignado
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ justifyContent: 'center', mb: '2rem' }}>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {accountCharged.user_status ? 'Activo' : 'Inactivo'}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {parkinsonCharged.phase}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h5" color="grey.600" sx = {{marginLeft: '10px'}} >
                                                {therapistCharged.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        )
                    }
                </Grid>
            </MainCard>
        ); 
    }
}; 

export default Profile; 