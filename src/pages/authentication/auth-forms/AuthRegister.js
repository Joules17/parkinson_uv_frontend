import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
// material-ui
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography, 
    ButtonGroup,
    useMediaQuery, 
    Select, 
    MenuItem
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

// API 
import { useExternalApi as PatientsApi } from 'hooks/patientResponse';
import { useExternalApi as TherapistApi } from 'hooks/therapistResponse'; 

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined, CoffeeOutlined, UserOutlined} from '@ant-design/icons';


// ============================|| FIREBASE - REGISTER ||============================ //

const generos = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'no binario', label: 'No binario' },
  ];

const tipos_id = [
    { value: 'C.C.', label: 'C.C.'}, 
    { value: 'T.I.', label: 'T.I.'},
    { value: 'Pas', label: 'Pasaporte'},
]; 

const AuthRegister = () => {
    const [level, setLevel] = useState();
    const [levelTherapist, setLevelTherapist] = useState();
    const [tipo, setTipo] = useState('paciente'); 
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTherapist, setShowPasswordTherapist] = useState(false);

    // API ------------------------------------------------------------
    const { user } = useAuth0(); 
    const nav = useNavigate()

    const { createPatientAccount } = PatientsApi()
    const { createTherapistAccount } = TherapistApi()

    // eslint-disable-next-line
    const [mensaje, setMensaje] = useState('Registro')

    // -----------------------------------------------------------------
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordTherapist = () => {   
        setShowPasswordTherapist(!showPasswordTherapist)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const changePasswordTherapist  = (value) => {
        const temp = strengthIndicator(value);
        setLevelTherapist(strengthColor(temp));
    }


    useEffect(() => {
        changePassword('');
        changePasswordTherapist(''); 
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem'}}>
                <Typography variant="h5" align="center" gutterBottom>
                    ¿Qué eres?
                </Typography>
                <ButtonGroup size="large">
                    <Button startIcon={<UserOutlined />} disableElevation color="primary"
                    fullWidth={!matchDownSM}
                    onClick = {() => setTipo('paciente')} variant={tipo === 'paciente' ? 'contained' : 'outlined'}>
                    Paciente
                    </Button>
                    <Button startIcon={<CoffeeOutlined />} disableElevation color="primary"
                    fullWidth={!matchDownSM}
                    onClick = {() => setTipo('terapeuta')} variant ={tipo === 'terapeuta' ? 'contained' : 'outlined'}>
                    Terapeuta
                    </Button>
                </ButtonGroup>
            </div>
            {tipo == 'paciente' && 
                <Formik
                initialValues={{
                    document_type: '', 
                    document_id: '',
                    name: '',
                    lastname: '',
                    gender: '',
                    cell: '',
                    age: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    document_type: Yup.string().max(20).required('Necesitamos saber tu tipo de id'), 
                    document_id: Yup.string().max(200).required('Necesitamos saber tu numero de indentificacion'),
                    name: Yup.string().max(255).required('Recuerda poner tu nombre'),
                    lastname: Yup.string().max(255).required('Necesitamos tu apellido'),
                    gender: Yup.string().max(20).required('Necesitamos saber tu genero'),
                    cell: Yup.string().max(200).required('Necesitamos un telefono'),
                    age: Yup.string().max(11).required('La fecha de nacimiento es obligatoria'),
                    password: Yup.string().max(255).required('¡Necesitas una contraseña!')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log('Datos a registrar del paciente: ', values)
                        setStatus({ success: false });
                        setSubmitting(false);
                        createPatientAccount(values, user.sub, user.email, user.picture, setMensaje)
                        setTimeout(() => {
                            nav(`/`)
                        }, 2000)
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="document_type-signup">Tipo ID</InputLabel>
                                    <Select
                                        labelId="document_type-label"
                                        id = "document_type-select"
                                        value = {values.document_type}
                                        type="document_type"
                                        onChange={(e) => {
                                            handleChange(e, "document_type");
                                          }}
                                        label = "Tipo ID"
                                        name="document_type"
                                        onBlur={handleBlur}
                                        placeholder="C.C."
                                        fullWidth
                                        error={Boolean(touched.document_type && errors.document_type)}
                                    >
                                        {tipos_id.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>))}
                                    </Select>
                                    {touched.document_type && errors.document_type && (
                                        <FormHelperText error id="helper-text-document_type-signup">
                                            {errors.document_type}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md = {8}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="document_id-signup">Num. Documento</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.document_id && errors.document_id)}
                                        id="document_id-signup"
                                        type="document_id"
                                        value={values.document_id}
                                        name="document_id"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="1110042636"
                                        inputProps={{}}
                                    />
                                    {touched.document_id && errors.document_id && (
                                        <FormHelperText error id="helper-text-cell-document_id">
                                            {errors.document_id}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-signup">Nombre*</InputLabel>
                                    <OutlinedInput
                                        id="name"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Maria"
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="helper-text-name-signup">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Apellido*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        id="lastname-signup"
                                        type="lastname"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Ramirez"
                                        inputProps={{}}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="helper-text-lastname-signup">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="gender-signup">Genero</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id = "gender-select"
                                        value = {values.gender}
                                        type="gender"
                                        onChange={(e) => {
                                            handleChange(e, "gender");
                                          }}
                                        label = "Género"
                                        name="gender"
                                        onBlur={handleBlur}
                                        placeholder="Femenino"
                                        fullWidth
                                        error={Boolean(touched.gender && errors.gender)}
                                    >
                                        {generos.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>))}
                                    </Select>
                                    {touched.gender && errors.gender && (
                                        <FormHelperText error id="helper-text-gender-signup">
                                            {errors.gender}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md = {6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="age-signup">Fecha de nacimiento</InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                    id = "age-signup"
                                    name = "age"
                                    value = {values.age}
                                    onChange={(e) => {
                                        let fecha_ajustada = e.toISOString().slice(0, 10);
                                        setFieldValue("age", fecha_ajustada); // Utilizamos setFieldValue para actualizar el valor del campo
                                      }}
                                    onBlur = {handleBlur}
                                    placeholder = "DD/MM/AAAA"
                                    fullWidth
                                    error={Boolean(touched.age && errors.age)}
                                    inputVariant="outlined"
                                    clearable
                                    disableFuture />
                                    </LocalizationProvider>
                                    {touched.age && errors.age && (
                                        <FormHelperText error id="helper-text-age-signup">
                                            {errors.age}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="cell-signup">Telefono*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.cell && errors.cell)}
                                        id="cell-signup"
                                        type="cell"
                                        value={values.cell}
                                        name="cell"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="3135780466"
                                        inputProps={{}}
                                    />
                                    {touched.cell && errors.cell && (
                                        <FormHelperText error id="helper-text-cell-signup">
                                            {errors.cell}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Contraseña</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    Al registrarse, usted acepta participar en el proyecto &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        ParkinsonUV
                                    </Link>
                                </Typography>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Crear Cuenta
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            }
            {tipo == 'terapeuta' &&
                <Formik
                initialValues={{
                    document_type: '', 
                    document_id: '', 
                    name: '',
                    lastname: '',
                    gender: '',
                    cell: ''
                }}
                validationSchema={Yup.object().shape({
                    document_type: Yup.string().max(20).required('Recuerda poner tu tipo de id'),
                    document_id: Yup.string().max(255).required('Recuerda poner tu identificacion'),
                    name: Yup.string().max(255).required('Recuerda poner tu nombre'),
                    lastname: Yup.string().max(255).required('Necesitamos tu apellido'),
                    cell: Yup.string().max(200).required('Necesitamos un telefono')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        createTherapistAccount(values, user.sub, user.email, user.picture, setMensaje)
                        setTimeout(() => {
                            nav(`/`)
                        }, 2000)
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="document_type-signup">Tipo ID</InputLabel>
                                    <Select
                                        labelId="document_type-label"
                                        id = "document_type-select"
                                        value = {values.document_type}
                                        type="document_type"
                                        onChange={(e) => {
                                            handleChange(e, "document_type");
                                          }}
                                        label = "Tipo ID"
                                        name="document_type"
                                        onBlur={handleBlur}
                                        placeholder="C.C."
                                        fullWidth
                                        error={Boolean(touched.document_type && errors.document_type)}
                                    >
                                        {tipos_id.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>))}
                                    </Select>
                                    {touched.document_type && errors.document_type && (
                                        <FormHelperText error id="helper-text-document_type-signup">
                                            {errors.document_type}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md = {8}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="document_id-signup">Num. Documento</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.document_id && errors.document_id)}
                                        id="document_id-signup"
                                        type="document_id"
                                        value={values.document_id}
                                        name="document_id"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="1110042636"
                                        inputProps={{}}
                                    />
                                    {touched.document_id && errors.document_id && (
                                        <FormHelperText error id="helper-text-cell-document_id">
                                            {errors.document_id}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} >
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="name-signup">Nombre*</InputLabel>
                                    <OutlinedInput
                                        id="name"
                                        type="name"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Elizabeth"
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                    />
                                    {touched.name && errors.name && (
                                        <FormHelperText error id="helper-text-name-signup">
                                            {errors.name}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} >
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Apellido*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        id="lastname-signup"
                                        type="lastname"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Ramirez"
                                        inputProps={{}}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="helper-text-lastname-signup">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="cell-signup">Telefono*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.cell && errors.cell)}
                                        id="cell-signup"
                                        type="cell"
                                        value={values.cell}
                                        name="cell"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="3135780466"
                                        inputProps={{}}
                                    />
                                    {touched.cell && errors.cell && (
                                        <FormHelperText error id="helper-text-cell-signup">
                                            {errors.cell}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Contraseña</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPasswordTherapist ? 'text' : 'password'}
                                        value={values.password || ''} 
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePasswordTherapist(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPasswordTherapist}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPasswordTherapist ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: levelTherapist?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {levelTherapist?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    Al registrarse, usted acepta participar en el proyecto &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        ParkinsonUV
                                    </Link>
                                </Typography>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Crear Cuenta
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            }
            
            </>
    );
};

export default AuthRegister;