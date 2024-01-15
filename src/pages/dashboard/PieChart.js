// react
import { useEffect, useState } from 'react';

// prop
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
// chart options
const pieChartOptions = {
    chart: {
        type: 'pie',
        height: 365,
        toolbar: {
            show: true
        }
    },
    plotOptions: {
        pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: false,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
            dataLabels: {
                offset: 0,
                minAngleToShowLabel: 10
            }
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '14px',
            fontWeight: 400,
            colors: ['#ffffff'] 
        }
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    legend: {
        show: true,
        fontSize: '16px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        labels: {
            colors: '#000000'
        },
        position: 'bottom',
        horizontalAlign: 'center',
        markers: {
            width: 14,
            height: 14,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        }
    },
    tooltip: {
        fillSeriesColor: false
    }
};

// ==============================|| ACTIVITY PIE CHART ||============================== //

const ActivityPieChart = ({ activityStats }) => {
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;

    const [series, setSeries] = useState([activityStats.total_activities_pending, activityStats.total_activities_in_progress, activityStats.total_activities_finished, activityStats.total_activities_lost]);
    console.log('HOLA:', activityStats.total_activities_lost)
    const [options, setOptions] = useState(pieChartOptions);

    useEffect(() => {
        const totalActivities = activityStats.total_activities;

        setOptions((prevState) => ({
            ...prevState,
            labels: ['Pendientes', 'En curso', 'Realizadas', 'Caducadas'],
            tooltip: {
                theme: 'light',
                y: {
                    formatter: function (value) {
                        return Math.round((value / totalActivities) * 100) + '%';
                    }
                }
            }
        }));

        setSeries([activityStats.total_activities_pending, activityStats.total_activities_in_progress, activityStats.total_activities_finished, activityStats.total_activities_lost]);

    }, [activityStats, primary, secondary]);

    return <ReactApexChart options={options} series={series} type="pie" height={365} />
};

export default ActivityPieChart;

ActivityPieChart.propTypes = {
    activityStats: PropTypes.object
};
