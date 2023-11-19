import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

const PatientReportsAreaChart = ({ data, selected_patients, selected_variable_y }) => {
    const [chartData, setChartData] = useState([]);
    const [xCategories, setXCategories] = useState([]);

    useEffect(() => {
        // Obtener fechas únicas de los reportes
        const uniqueDates = [...new Set(data.map((item) => item.date_created))];

        // Crear series para el gráfico
        const series = selected_patients.map((patientId) => {
            const patientData = data.filter((item) => item.patient_id === patientId);
            const dataPoints = uniqueDates.map((date) => {
                const report = patientData.find((item) => item.date_created === date);
                return report ? report[selected_variable_y] : 0;
            });
            return {
                name: `${getPatientName(patientId, data)}`,
                data: dataPoints
            };
        });

        setChartData(series);

        // Crear array de objetos con valor y etiqueta para xaxis
        const xCategoriesArray = uniqueDates.map((date) => ({
            value: date,
            label: new Date(date).toLocaleDateString(),
        }));
        setXCategories(xCategoriesArray);

    }, [data, selected_patients, selected_variable_y]);

    const options = {
        chart: {
            height: 450,
            type: 'area',
            toolbar: {
                show: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        grid: {
            strokeDashArray: 0
        },
        yaxis: {
            title: {
                text: selected_variable_y,
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#008FFB'
                }
            }
        },
        xaxis: {
            categories: xCategories.map((item) => item.value),
            labels: {
                formatter: function (value) {
                    const xCategory = xCategories.find((item) => item.value === value);
                    return xCategory ? xCategory.label : '';
                }
            },
            title: {
                text: 'Fecha',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#008FFB'
                }
            }
        },
    };

    return <ReactApexChart options={options} series={chartData} type="area" height={450} />;
};

PatientReportsAreaChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    selected_patients: PropTypes.arrayOf(PropTypes.string),
    selected_variable_y: PropTypes.string
};

const getPatientName = (patientId, data) => {
    const patientInfo = data.find((item) => item.patient_id === patientId);
    return patientInfo ? `${patientInfo.patient_name} ${patientInfo.patient_lastname}` : `Patient ${patientId}`;
};

export default PatientReportsAreaChart;