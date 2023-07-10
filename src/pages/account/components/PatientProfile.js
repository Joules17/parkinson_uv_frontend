// prop
import PropTypes from 'prop-types';

// project import
import MainCard from 'components/MainCard';
import calcularEdad from 'components/handleAge';

import ProfilePatientForm from 'components/Profile/ProfilePatientForm';

// material-ui
import { Typography, Stack, Grid, Avatar, Button } from '@mui/material';

const PatientProfile = ({ user, img, handleEdit, editMode, editable, handleExit, onSubmit }) => {
    return (
        <MainCard imgUrl={img} imageHeight="200px" contentSX={{ p: 2.25 }}>
            <Grid container alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item sx={{ position: 'relative', zIndex: 2 }}>
                    <Avatar src={user.user_picture} sx={{ width: 100, height: 100, position: 'relative', top: '-40px' }} />
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
                    {editable ? (<Button
                        disableElevation
                        color="primary"
                        onClick={() => { editMode ? null : handleEdit() }}
                        variant="contained"
                        sx={{
                            position: 'relative',
                            top: '-35px',
                            marginLeft: 'auto',
                        }}
                    >
                        {editMode ? 'Editando...' : 'Editar'}
                    </Button>) :
                        null
                    }

                </Grid>
                {editMode ? (
                    <ProfilePatientForm userCharged={user} handleExit={handleExit} onSubmit={onSubmit} />
                ) : (
                    <>
                        <Grid item xs={12} sx={{ marginTop: '20px' }}>
                            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                                <Grid item xs={4}>
                                    <Typography variant="h4" color="inherit" sx={{ marginLeft: '10px' }}>
                                        Identificacion
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h4" color="inherit" sx={{ marginLeft: '10px' }}>
                                        Nombre Completo
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h4" color="inherit" sx={{ marginLeft: '10px' }}>
                                        Email
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ justifyContent: 'center', mb: '2rem' }}>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {user.document_type} {user.document_id}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {user.name} {user.lastname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {user.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                                <Grid item xs={4}>
                                    <Typography variant="h4" sx={{ marginLeft: '10px' }}>
                                        Teléfono
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h4" sx={{ marginLeft: '10px' }}>
                                        Edad
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h4" sx={{ marginLeft: '10px' }}>
                                        Género
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ justifyContent: 'center', mb: '2rem' }}>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {user.cell}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {calcularEdad(user.age)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {user.gender}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                                <Grid item xs={4}>
                                    <Typography variant="h4" sx={{ marginLeft: '10px' }}>
                                        Estado
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h4" sx={{ marginLeft: '10px' }}>
                                        Fase de Parkinson
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h4" sx={{ marginLeft: '10px' }}>
                                        Terapeuta Asignado
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ justifyContent: 'center', mb: '2rem' }}>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {user.user_status ? 'Activo' : 'Inactivo'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {user.parkinson_phase}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="h5" color="grey.600" sx={{ marginLeft: '10px' }}>
                                        {user.therapist_name} {user.therapist_lastname}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </MainCard>
    );
};

PatientProfile.propTypes = {
    user: PropTypes.object,
    img: PropTypes.string,
    handleEdit: PropTypes.func,
    handleExit: PropTypes.func,
    editMode: PropTypes.bool,
    editable: PropTypes.bool,
    onSubmit: PropTypes.func
};

export default PatientProfile;