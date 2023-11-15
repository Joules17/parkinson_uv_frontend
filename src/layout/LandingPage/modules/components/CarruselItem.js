// prop
import PropTypes from 'prop-types';

// mui 
import { Grid, Box, Typography, useMediaQuery } from '@mui/material';

function Item({ item }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid item xs={12} lg={6} sm={6}>
        <Box display="flex" justifyContent="center">
          <div  style={{ position: 'relative' }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                maxWidth: '50%', 
                marginLeft: isSmallScreen ? '6rem' : '10rem', 
              }}
            />
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6} sm={6}>
        <Box>
          <Typography variant="h1" sx={{ mb: '1rem' }}>
            {item.title}
          </Typography>
          <Typography variant="h6" style={{ textAlign: 'justify' }}>{item.description}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Item;

Item.propTypes = {
  item: PropTypes.object
}