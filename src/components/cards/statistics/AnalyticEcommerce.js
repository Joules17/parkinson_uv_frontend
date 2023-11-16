import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ title, count, percentage, extra }) => {
    const chipColor =
        percentage !== undefined
            ? percentage < 50
                ? 'warning'
                : percentage === 100
                ? 'success'
                : 'primary'
            : 'primary';

    return (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                <Grid item>
                    <Chip
                        variant="combined"
                        color={chipColor}
                        label={`${percentage}%`}
                        sx={{ ml: 1.25, pl: 1 }}
                        size="small"
                    />
                </Grid>
            </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
            <Typography variant="caption" color="textSecondary">
                You made an extra{' '}
                <Typography component="span" variant="caption" sx={{ color: `${chipColor || 'primary'}.main` }}>
                    {extra}
                </Typography>{' '}
                this year
            </Typography>
        </Box>
    </MainCard>
);
}

AnalyticEcommerce.propTypes = {
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default AnalyticEcommerce;
