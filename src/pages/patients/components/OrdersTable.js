import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(trackingNo, name, fat, carbs, protein) {
    return { trackingNo, name, fat, carbs, protein };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'pfp',
        align: 'center',
        disablePadding: false,
        label: ''
    },
    {
        id: 'tipo_id',
        align: 'center',
        disablePadding: false,
        label: 'Tipo ID'
    },
    {
        id: 'id',
        align: 'center',
        disablePadding: false,
        label: 'Documento'
    },
    {
        id: 'name',
        align: 'center',
        disablePadding: true,
        label: 'Nombre'
    },
    {
        id: 'age',
        align: 'center',
        disablePadding: false,
        label: 'Edad'
    },
    {
        id: 'gender',
        align: 'center',
        disablePadding: false,
        label: 'Género'
    },
    {
        id: 'parkinson', 
        align: 'center', 
        disablePadding: false, 
        label: 'Fase de Parkinson'
    },
    {
        id: 'assign',
        align: 'center',
        disablePadding: false,
        label: 'Asignacion'
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Estado'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const AssignStatus = ({ value }) => {
    let color;
    let title;
    if (value === '111') {
        color = 'warning'; 
        title = 'No Asignado'
    } else {
        color = 'success'; 
        title = 'Asignado'
    }
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

AssignStatus.propTypes = {
    value: PropTypes.string
};

// ==============================|| SET - STATUS ||============================== //

const SetStatus = ({ value }) => {
    let color;
    let title;
    
    if (value) {
        color = 'success'; 
        title = 'Activo'
    } else {
        color = 'error'; 
        title = 'Inactivo'
    }
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

SetStatus.propTypes = {
    value: PropTypes.bool
};
// ==============================|| CALCULATE AGE ||============================== //

const CalculateAge = ({value}) => {
    var fechaActual = new Date();
    var fechaNac = new Date(value);
    var edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    var mesActual = fechaActual.getMonth();
    var mesNac = fechaNac.getMonth();

    // Verificar si aún no se ha cumplido el cumpleaños en el mes actual
    if (mesActual < mesNac) {
        edad--;
    }
    // Verificar si se ha cumplido el cumpleaños pero no el día
    else if (mesActual === mesNac) {
        var diaActual = fechaActual.getDate();
        var diaNac = fechaNac.getDate();
        if (diaActual < diaNac) {
        edad--;
        }
    }

    return edad;
};

CalculateAge.propTypes = {
    value: PropTypes.string
}; 

// aux function 
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};  
capitalizeFirstLetter.propTypes = {
    word: PropTypes.string
}; 

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({ list }) {
    console.log('hola', list)
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                     <TableBody>
                        {stableSort(list, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.trackingNo);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.user_id}
                                    selected={isItemSelected}
                                >
                                    <TableCell align="center"><Avatar alt="pfp" src={row.user_picture}/></TableCell>
                                    <TableCell align="center">{row.document_type}</TableCell>
                                    <TableCell align="left">{row.document_id}</TableCell>
                                    <TableCell align="left">{row.name + " " +row.lastname}</TableCell>
                                    <TableCell align="center"><CalculateAge value = {row.age}/></TableCell>
                                    <TableCell align="left">{capitalizeFirstLetter(row.gender)}</TableCell>
                                    <TableCell align="left">{row.id_parkinson_phase_id}</TableCell>
                                    <TableCell align="left"><AssignStatus value = {row.id_therapist_id}/></TableCell>
                                    <TableCell align="left"><SetStatus value = {row.user_status}/></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody> 
                </Table>
            </TableContainer>
        </Box>
    );
}


OrderTable.propTypes = {
    list: PropTypes.array
};