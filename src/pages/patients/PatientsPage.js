// react 
import { useEffect, useState } from 'react';

// material-ui
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import { Grid, Typography } from '@mui/material';
// import { PlusOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';
// import OrderTable from './components/OrdersTable';
import UserList from './components/UserList';
// api 
import { useExternalApi as useTherapistResponse } from 'hooks/therapistResponse'

// auth 0 imports 
import { useAuth0 } from '@auth0/auth0-react';


// ==============================|| PATIENTS PAGE ||============================== //

const PatientsPage = () => {
    // auth 0 functions ----------------------------------------------------------------
    const { user } = useAuth0()
    // api responses use-states
    const [patientsLIST, setPatientsLIST] = useState(undefined);
    const [userCharged, setUserCharged] = useState(undefined);
    const [isLoading, setLoading] = useState('Cargando Informacion...')
    // api request 
    const { getTherapist, getTherapistPatients } = useTherapistResponse()

    // inicializador -----------------------------------------------------

    useEffect(() => {
        getTherapist(user.sub, setUserCharged);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!(userCharged === undefined)) {
            getTherapistPatients(userCharged.user_id, setPatientsLIST)
                .then(() => {
                    setLoading('Usuarios')
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCharged])

    if (Array.isArray(patientsLIST)) {
        return (
            <MainCard title="Pacientes" darkTitle={true}>
                <Grid item xs={12} md={7} lg={8}>
                    <MainCard sx={{ mt: 2 }} content={false} >
                        <UserList list={patientsLIST} setList={setPatientsLIST} loading={isLoading} setLoading={setLoading} />
                    </MainCard>
                </Grid>
            </MainCard>
        );
    } else {
        return (
            <ChargingCard />
        );
    }
}



export default PatientsPage;
