// mui
import { Box, Typography, Container } from '@mui/material';

// project imports 
import Carrusel from '../components/Carrusel';

// Cognitive Domains 
const cognitive_domains = [
    {
        "id": 1, 
        "image": 'https://i.imgur.com/zZ99OmE_d.webp?maxwidth=760&fidelity=grand', 
        "title": "Memoria", 
        "description": 'La memoria reciente, a veces llamada memoria a corto plazo, es un componente fundamental del sistema de la memoria humana. Este dominio cognitivo se refiere a la capacidad de una persona para retener y recuperar información que ha sido adquirida recientemente, generalmente en un corto período de tiempo, que puede variar desde unos pocos segundos hasta varios minutos.'
    }, 
    {
        "id": 2, 
        "image": 'https://i.imgur.com/mg4ugXv_d.webp?maxwidth=760&fidelity=grand',
        "title": "Atención", 
        "description": "La atención es un proceso cognitivo fundamental que permite a los individuos enfocarse en información específica o estímulos relevantes mientras filtran o ignoran distracciones. Este mecanismo desempeña un papel esencial en el funcionamiento cognitivo y comportamental, ya que facilita la capacidad de procesar, comprender y reaccionar ante el entorno circundante. La atención se manifiesta en diversas formas, en el caso de ParkinsonUV, se trata la atencion continua y selectiva."
    }, 
    {
        "id": 3,
        "image": 'https://i.imgur.com/aJFyDqb_d.webp?maxwidth=760&fidelity=grand',
        "title": "Lenguaje", 
        "description": "El lenguaje como dominio cognitivo abarca tanto el lenguaje expresivo como el lenguaje receptivo. El lenguaje expresivo se refiere a la capacidad de una persona para identificar objetos, fluidez o fonemica. El lenguaje receptivo se trata de comprender y procesar el lenguaje comunicado por otros a través de la escucha y la lectura. Ambas dimensiones son esenciales para la comunicación, la comprensión y la cognición humanas."
    }, 
    {
        "id": 4, 
        "image": 'https://i.imgur.com/PDbNsL7_d.webp?maxwidth=760&fidelity=grand',
        "title": "Funciones Ejecutivas", 
        "description" : "Las funciones ejecutivas son un dominio cognitivo clave que engloba un conjunto de habilidades cognitivas superiores necesarias para la autorregulación del pensamiento y el comportamiento. Estas habilidades incluyen la planificación, la toma de decisiones, la organización, la memoria de trabajo, la inhibición de impulsos y la flexibilidad cognitiva. "
    }, 
    {
        "id": 5, 
        "image": 'https://i.imgur.com/16K06up_d.webp?maxwidth=760&fidelity=grand',
        "title": "Habilidades Visocontructivas", 
        "description": "Las habilidades visoconstructivas representan un dominio cognitivo que engloba la capacidad de percibir, procesar y manipular información visual para crear y comprender objetos, formas y patrones."
    }
]

function ProductDomains() {
    return (
        <Box
            sx={{
                backgroundColor: '#f1f5f9',
                borderTopLeftRadius: '80px',
                padding: '80px 0'
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h2" align="center" gutterBottom>
                    Dominios Cognitivos
                </Typography>
                <Typography variant="h6" align="center" paragraph sx = {{ mb: '4rem'}}>
                    ParkinsonUV cuenta con actividades que trabajan los siguientes dominios cognitivos: 
                </Typography>
                <Carrusel items_helper = {cognitive_domains} />
            </Container>
        </Box>
    );
}

export default ProductDomains; 