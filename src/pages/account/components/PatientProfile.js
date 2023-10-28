// prop
import PropTypes from 'prop-types';

// project import
import MainCard from 'components/MainCard';
import calcularEdad from 'components/handleAge';

import ProfilePatientForm from 'components/Profile/ProfilePatientForm';

// material-ui
import { Typography, Stack, Grid, Avatar, Button, TextField } from '@mui/material';

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
                    {editable ? (
                        <Button
                            disableElevation
                            color="primary"
                            onClick={() => {
                                editMode ? null : handleEdit();
                            }}
                            variant="contained"
                            sx={{
                                position: 'relative',
                                top: '-35px',
                                marginLeft: 'auto'
                            }}
                        >
                            {editMode ? 'Editando...' : 'Editar'}
                        </Button>
                    ) : null}
                </Grid>
                {editMode ? (
                    <ProfilePatientForm userCharged={user} handleExit={handleExit} onSubmit={onSubmit} />
                ) : (
                    <>
                        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                            <Grid item xs={12} sm={12} lg={12}>
                                <Typography variant="h4" color="inherit">
                                    Datos Personales
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Identificacion"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                    defaultValue={`${user.document_type} ${user.document_id}`}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Nombre Completo"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                    defaultValue={`${user.name} ${user.lastname}`}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Email" fullWidth InputProps={{ readOnly: true }} defaultValue={user.email} />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField label="Teléfono" fullWidth InputProps={{ readOnly: true }} defaultValue={user.cell} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Edad" fullWidth InputProps={{ readOnly: true }} defaultValue={calcularEdad(user.age)} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Género" fullWidth InputProps={{ readOnly: true }} defaultValue={user.gender} />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Estado"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                    defaultValue={user.user_status ? 'Activo' : 'Inactivo'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Fase de Parkinson"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                    defaultValue={user.parkinson_phase}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Terapeuta Asignado"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                    defaultValue={`${user.therapist_name} ${user.therapist_lastname}`}
                                />
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
