// material-ui
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Typography, Grid } from '@mui/material';
import { PlusOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import OrderTable from './components/OrdersTable';

// ==============================|| PATIENTS PAGE ||============================== //

const PatientsPage = () => (
    <MainCard title="Pacientes" darkTitle="true">
        <Grid item xs={12} md={7} lg={8}>
            <MainCard sx={{ mt: 2 }} content={false}>
                <OrderTable />
            </MainCard>
        </Grid>
    </MainCard>

);

export default PatientsPage;
