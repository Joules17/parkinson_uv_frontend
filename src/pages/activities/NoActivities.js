// mui 
import { Container, Typography, Paper } from '@mui/material';

export default function NoActivities() {
    return ( 
        <Container>
          <Typography variant="h2" sx={{ mb: 5 }}>
            Actividades
          </Typography>
          <Paper
              sx={{
                textAlign: 'center',
              }}
              >
              <Typography variant="h6" paragraph>
                No Encontrado 
              </Typography>

              <Typography variant="body2">
                No hay actividades disponibles
                <br /> Parece que no tienes ninguna actividad creada
              </Typography>
            </Paper>
        </Container>
    )
}