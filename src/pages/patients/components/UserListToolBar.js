// prop
import PropTypes from 'prop-types';

// mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Button } from '@mui/material';

// assets
import { SearchOutlined, UserDeleteOutlined, FilterOutlined, UserOutlined } from '@ant-design/icons';

// ============================================================================== //
const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
        width: 320,
        boxShadow: theme.customShadows.z8
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`
    }
}));

// ====================================================================================
export default function UserListToolbar({ numSelected, filterName, onFilterName, loading }) {
    console.log(loading)
    return (
        <StyledRoot
            sx={{
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} seleccionado(s)
                </Typography>
            ) : (
                <StyledSearch
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="Buscar por nombre ..."
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchOutlined sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    }
                />
            )}

            {numSelected > 0 ? (
                <Tooltip title="Desactivar Usuario(s)">
                    <IconButton>
                        <UserDeleteOutlined style={{ color: 'red' }}/>
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <Button variant="contained" startIcon={<UserOutlined />}>
                        {loading}
                    </Button>
                </>
            )}
        </StyledRoot>
    );
}
// ===================================================================================
// PropTypes
UserListToolbar.propTypes = {
    numSelected: PropTypes.number, 
    filterName: PropTypes.string, 
    onFilterName: PropTypes.func, 
    loading: PropTypes.string
};