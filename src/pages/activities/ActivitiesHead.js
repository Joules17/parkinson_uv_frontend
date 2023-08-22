// prop
import PropTypes from 'prop-types';

// mui
import { styled, alpha } from '@mui/material/styles';
import {  OutlinedInput, InputAdornment } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';

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

// =============================================== Activities Head
export default function ActivitiesHead ( {filterWord, onFilterWord, option}) {
    return (
        <StyledSearch
                    value={filterWord}
                    onChange={onFilterWord}
                    placeholder={`Buscar por: ${option}`}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchOutlined sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    }
                />
    )
}