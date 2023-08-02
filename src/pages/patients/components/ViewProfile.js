// react
import { useNavigate } from 'react-router-dom';

// proptypes
import PropTypes from 'prop-types';

// mui
import { Stack, IconButton, Tooltip } from '@mui/material';

// assets
import {  EyeOutlined } from '@ant-design/icons';

export default function ViewProfile({user_id, tipo}) {
    const navigate = useNavigate();
    const form = { user_id_state: user_id, tipo_state: tipo };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/my-profile', {
        state: form
        });
    }

    return(
        <Stack direction = "row" spacing = {1} alignItems = "center">
            <Tooltip title = 'Ver Perfil' >
                <IconButton onClick = {handleSubmit}>
                    <EyeOutlined/>
                </IconButton>
            </Tooltip>
        </Stack>
    );
}

ViewProfile.propTypes = {
    user_id: PropTypes.string,
    tipo: PropTypes.string
};