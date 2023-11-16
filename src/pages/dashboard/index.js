import { useState, useEffect } from 'react';

// auth 0 imports
import { useAuth0 } from '@auth0/auth0-react';

// project import
import ChargingCard from 'components/ChargingCard';
import DashboardDoctor from './DashboardDoctor';
import DashboardPatient from './DashboardPatient';

// api
import { useExternalApi as useReportResponse } from 'hooks/reportsResponse'
import { useExternalApi as useTherapistResponse} from 'hooks/therapistResponse'

// DashboardDefault

const DashboardDefault = () => {
    // auth 0
    const { user } = useAuth0();

    // api request
    const { GetReportsByTherapistDetailed, GetStatsByTherapistDetailed } = useReportResponse();
    const { getTherapistDetailed } = useTherapistResponse();

    // login vars
    const [tipo, setTipo] = useState(null)
    const [user_id, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    // statistics
    const [reports, setReports] = useState(undefined);
    const [stats, setStats] = useState(undefined);
    // Inicilalizador
    useEffect(() => {
        setUser(user.sub)
        setTipo(window.localStorage.getItem('tipo'))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (user_id !== null && tipo !== null) {
            if (tipo === '1') {
                GetReportsByTherapistDetailed(user_id, setReports)
                getTherapistDetailed(user_id, setUserInfo)
                GetStatsByTherapistDetailed(user_id, setStats)
            } else {
                console.log('Trabajar en la vista para paciente despues')
            }
        }
        // eslint-disable-next-line
    }, [user_id, tipo])

    console.log('***************** REPORTES ****************')
    console.log(reports)
    if (tipo === null || user_id === null || reports === undefined || userInfo === null || stats === undefined) {
        return (
            <ChargingCard />
        )
    } else if (tipo === '1') {
        return (
            <DashboardDoctor reports = {reports} activity_stats = {stats} user = {userInfo}/>
        )
    } else {
        <DashboardPatient reports = {reports} user = {userInfo}/>
    }

};

export default DashboardDefault;
