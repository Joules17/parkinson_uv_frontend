import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, Typography } from '@mui/material';

const PatientSelection = ({ patientOptions, selectedPatients, setSelectedPatients }) => {
    const handleCheckboxChange = (patientId) => {
        const isPatientSelected = selectedPatients.includes(patientId);
        const updatedPatients = isPatientSelected
            ? selectedPatients.filter((id) => id !== patientId)
            : [...selectedPatients, patientId].slice(0, 2);

        setSelectedPatients(updatedPatients);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <div style={{ maxHeight: 50, maxWidth: 200, overflow: 'auto', border: '1px solid #ddd', borderRadius: '4px' }}>
                {patientOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        control={
                            <Checkbox
                                checked={selectedPatients.includes(option.value)}
                                onChange={() => handleCheckboxChange(option.value)}
                                sx = {{ml: 1}}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </div>
        </FormControl>
    );
};

PatientSelection.propTypes = {
    patientOptions: PropTypes.arrayOf(PropTypes.object),
    selectedPatients: PropTypes.arrayOf(PropTypes.string),
    setSelectedPatients: PropTypes.func,
};

export default PatientSelection;