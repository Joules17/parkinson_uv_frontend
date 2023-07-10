// react
import { useState } from 'react';

// proptypes
import PropTypes from 'prop-types';

// filter
import { filter } from 'lodash';

// mui
import {
    Card,
    Table,
    Stack,
    Avatar,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    TablePagination,
    Select,
    MenuItem
} from '@mui/material';

// auth0
import { useAuth0 } from '@auth0/auth0-react'

// ================================== PROJECTS IMPORTS ====================================
// Project Import
import UserListHead from './UserListHead';
import UserListToolbar from './UserListToolBar';

// Aux functions and components
import ViewProfile from './ViewProfile';
import SetStatus from './SetStatus';
import AssignStatus from './AssignStatus';
import CalculateAge from '../functions/calculateAge';
import capitalizeFirstLetter from '../functions/capitalizeFirstLetter';

// hooks
import { useExternalApi as usePatientResponse } from 'hooks/patientResponse'
import { useExternalApi as useTherapistResponse } from 'hooks/therapistResponse'

// ================================== HEADER TABLE ========================================
const TABLE_HEAD = [
    { id: 'name', label: 'Nombre Completo', alignRight: 'false' },
    { id: 'tipo_id', label: 'Tipo ID', alignRight: 'false' },
    { id: 'id', label: 'N. Documento', alignRight: 'false' },
    { id: 'age', label: 'Edad', alignRight: 'false' },
    { id: 'gender', label: 'Género', alignRight: 'false' },
    { id: 'parkinson', label: 'Fase de EP', alignRight: 'false' },
    { id: 'assign', label: 'Asignacion', alignRight: 'false' },
    { id: 'status', label: 'Estado', alignRight: 'false' }
];

// ================================== OPTIONS =============================================

const PARKINSON_OPTIONS = [
    { id: 1, phase: "NoAsignado" },
    { id: 2, phase: "1" },
    { id: 3, phase: "2" },
    { id: 4, phase: "3" },
    { id: 5, phase: "4" },
    { id: 6, phase: "5" },
]
// ================================== COMPARATORS ====================================

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

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function UserList({ list, setList, loading, setLoading }) {
    // auth 0
    const { user } = useAuth0()
    // api
    const { updatePatientAssignee } = usePatientResponse()
    const { getTherapistPatients } = useTherapistResponse()
    //useStates
    /* const [open, setOpen] = useState(null);*/
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    // selected names - Hook by template
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    /* const [userrow, setUserrow] = useState({}); */

    //
    /*
    const handleOpenMenu = (event, row) => {
        // setOpen(event.currentTarget);
        // setUserrow(row);
    };
    */

    /*
    const handleCloseMenu = () => {
        setOpen(null);
        setUserrow({});
    };
    */
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = list.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    function handleParkinsonPhaseChange(key, therapist_id, patient_id) {
        console.log('esta llegando esto:', key, therapist_id, patient_id)
        let datos = {
            "id_parkinson_phase": key,
            "id_therapist": therapist_id
        }
        updatePatientAssignee(patient_id, datos)
            .then(() => {
                getTherapistPatients(user.sub, setList)
                setLoading('Usuarios')
            })
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;
    const filteredUsers = applySortFilter(list, getComparator(order, orderBy), filterName);
    const isNotFound = !filteredUsers.length && !!filterName;
    return (
        <Card>
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} loading={loading} />
            <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                    <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={filteredUsers.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const {
                                user_picture,
                                user_id,
                                document_type,
                                document_id,
                                name,
                                lastname,
                                age,
                                gender,
                                id_parkinson_phase_id,
                                id_therapist_id,
                                user_status
                            } = row;
                            const selectedUser = selected.indexOf(name) !== -1;

                            return (
                                <TableRow hover key={user_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                                    </TableCell>

                                    <TableCell component="th" scope="row" padding="none">
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={name} src={user_picture} />
                                            <Typography variant="subtitle2" noWrap>
                                                {name} {lastname}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell align="left">{document_type}</TableCell>

                                    <TableCell align="left">{document_id}</TableCell>

                                    <TableCell align="left">
                                        <CalculateAge value={age} />
                                    </TableCell>

                                    <TableCell align="left">{capitalizeFirstLetter(gender)}</TableCell>

                                    <TableCell align="left">
                                    <Select value={id_parkinson_phase_id} onChange={(event) => {handleParkinsonPhaseChange( event.target.value, id_therapist_id, user_id)}}>
                                        {PARKINSON_OPTIONS.map((item) => (
                                            <MenuItem key = {item.id} value={item.id} >{item.phase}</MenuItem>
                                    ))}
                                    </Select>
                                    </TableCell>

                                    <TableCell align="left">
                                        <AssignStatus
                                            user_id={user_id}
                                            value={id_therapist_id}
                                            parkinson_phase={id_parkinson_phase_id}
                                            setList={setList}
                                            setLoading={setLoading}
                                        />
                                    </TableCell>

                                    <TableCell align="left">
                                        <SetStatus user_id={user_id} value={user_status} setList={setList} setLoading={setLoading} />
                                    </TableCell>

                                    <TableCell align="right">
                                        <ViewProfile user_id = {user_id} tipo = {'2'}/>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    {isNotFound && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                                    <Typography variant="h6" paragraph>
                                        No encontrado
                                    </Typography>

                                    <Typography variant="body2">
                                        No hay resultados para &nbsp;
                                        <strong>&quot;{filterName}&quot;</strong>.
                                        <br /> Verifique o utilice palabras completas
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    );
}

UserList.propTypes = {
    list: PropTypes.array,
    setList: PropTypes.func,
    loading: PropTypes.string,
    setLoading: PropTypes.func
};
