import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
// import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const ExerciseBttn = ({ type, name, imgUrl, imageHeight }) => (
    <MainCard imgUrl={imgUrl} imageHeight= {imageHeight} contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {type}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {name}
                    </Typography>
                </Grid>
            </Grid>
        </Stack>
    </MainCard>
);

ExerciseBttn.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    imageHeight: PropTypes.string
};

ExerciseBttn.defaultProps = {
    color: 'primary'
};

export default ExerciseBttn;