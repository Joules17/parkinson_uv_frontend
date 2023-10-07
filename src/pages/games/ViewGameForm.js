// react
import { useState } from 'react';

// mui 
import { Grid, TextField, Typography, Divider, List, ListItemAvatar, ListItemButton, ListItemText, Avatar, Tooltip, Button, Box, FormControlLabel, FormGroup, Checkbox, FormControl } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import ChargingCard from 'components/ChargingCard';

// icons 
import { PlayCircleOutlined } from '@ant-design/icons';

// avatar style 
const avatarSX = {
    width: 36, 
    height: 36,
    fontSize: '1rem'
}; 

// action style
const actionSX = {
    mt: 0.75, 
    ml: 1, 
    top: 'auto', 
    right: 'auto',
    alignSelf: 'flex-start', 
    transform: 'none'
}; 

export default function ViewGameForm({card, handleCloseDialog, handleFormSubmit}) {
    const [valueRounds, setValueRounds] = useState(10); 
    const [valueLevels, setValueLevels] = useState(1); 
    const [wordsperlevel, setWordsperlevel] = useState(4); 
    const [valueWorldMinLength, setValueWorldMinLength] = useState(2);
    const [valueWordLength, setValueWordLength] = useState(10);
    const [valueFirstRoundArrow, setValueFirstRoundArrow] = useState(10);
    const [valueSecondRoundArrow, setValueSecondRoundArrow] = useState(10);
    const [selectedCategories, setSelectedCategories] = useState([]); 

    const objetos = [
        { value: "frutas", label: "Frutas" },
        { value: "comida", label: "Alimentos" },
        { value: "casa", label: "Objetos del hogar" }, 
        { value: "animales", label: "Animales"}
     ]

    // ------------------------------------------------------------- HANDLERS ------------------------------------------------------------- //

    const handleRoundsChange = (event) => {
        setValueRounds(event.target.value);
    };

    const handleLevelsChange = (event) => {
        setValueLevels(event.target.value);
    }; 

    const handleValueWorldMinLength = (event) => {
        setValueWorldMinLength(event.target.value); 
    }

    const handleValueWorldLength = (event) => {
        setValueWordLength(event.target.value);
    }; 
    
    const handleValueFirstRoundArrow = (event) => {
        setValueFirstRoundArrow(event.target.value);
    }; 

    const handleValueSecondRoundArrow = (event) => {
        setValueSecondRoundArrow(event.target.value);
    }; 

    const handleWordsPerLevelChange = (event) => {
        setWordsperlevel(event.target.value);
    }; 

    
    const handleCheckboxChange = (event) => {
        const optionValue = event.target.value;
        setSelectedCategories((prevSelectedOptions) => {
            if (prevSelectedOptions.includes(optionValue)) {
                return prevSelectedOptions.filter((value) => value !== optionValue);
            } else {
                return [...prevSelectedOptions, optionValue];
            }
        });
    };

    const handleStart = () => {
        const config = {
            rondas: valueRounds,
            wordsperlevel: wordsperlevel,
            niveles: valueLevels,
            longitudPalabra: valueWordLength,
            longitudMinPalabra: valueWorldMinLength,
            rondasFirstArrow: valueFirstRoundArrow,
            rondasSecondArrow: valueSecondRoundArrow,
            categorias: selectedCategories
        }
        handleFormSubmit(config); 
        handleCloseDialog();
    }; 
    if (card === null) {
        return <ChargingCard />
    } 
    return (
        <MainCard content={false}>
            <Grid item xs={12} >
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography fontWeight="bold" variant="1.25rem">
                            Juego Seleccionado
                        </Typography>
                        <Box
                            display="flex"
                            justifyContent="space-between" // Distribute items along the main axis
                            alignItems="center"
                            sx={{
                                padding: 1,
                                borderBottom: '1px solid #e0e0e0',
                                border: '1px solid #e0e0e0',
                            }}
                        >
                            <Box display="flex" alignItems="center">
                                <Avatar alt={card.title} src={card.image} sx={{ mr: '1rem' }} />
                                <div>
                                    <Typography variant="subtitle1">{card.title}</Typography>
                                </div>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography fontWeight="bold" variant="1.25rem">
                            Especificaciones
                        </Typography>
                    </Grid>
                    {(card.title !== 'Flechas Articas' && card.title !== 'Letras Marinas') && (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            type="number"
                            label="Número de Rondas"
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            value={valueRounds}
                            onChange={handleRoundsChange}
                            fullWidth
                        />
                        </Grid>
                    )}
                    {card.title === 'Letras Marinas' && (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            type="number"
                            label="Numero de palabras por nivel"
                            InputProps={{
                                inputProps: { min: 0, max: 6 }
                            }}
                            value={wordsperlevel}
                            onChange={handleWordsPerLevelChange}
                            fullWidth
                        />
                        </Grid>
                    )}
                    {card.title === 'Flechas Articas' && (
                        <>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            type="number"
                            label="Número de Rondas del Primer Nivel"
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            value={valueFirstRoundArrow}
                            onChange={handleValueFirstRoundArrow}
                            fullWidth
                        />
                        <TextField
                            type="number"
                            label="Número de Rondas del Segundo Nivel"
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            value={valueSecondRoundArrow}
                            onChange={handleValueSecondRoundArrow}
                            fullWidth
                        />
                        </Grid>
                        </>
                    )}
                    {(card.title === 'Recuerda y Encuentra' || card.title === 'Letras Marinas') && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            type="number"
                            label="Numero de Niveles"
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            value={valueLevels}
                            onChange={handleLevelsChange}
                            fullWidth
                        />
                    </Grid>
                    )}
                    {card.title === 'Palabras Ocultas' && (
                        <>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            type="number"
                            label="Longitud Minima de palabras"
                            InputProps={{
                                inputProps: { min: 2, max: 10 }
                            }}
                            value={valueWorldMinLength}
                            onChange={handleValueWorldMinLength}
                            fullWidth
                        />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            type="number"
                            label="Longitud Maxima de palabras"
                            InputProps={{
                                inputProps: { min: 2, max: 10 }
                            }}
                            value={valueWordLength}
                            onChange={handleValueWorldLength}
                            fullWidth
                        />
                        </Grid>
                        </>
                    )}
                    {
                        (card.title === 'Recuerda y Encuentra' || card.title === 'Objeto Intruso' || card.title === 'Letras Marinas') &&
                        (
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Typography fontWeight="bold" variant="1.25rem">
                                    Categorias
                                </Typography>
                                <FormControl fullWidth>
                                    <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                                        {objetos.map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            control={<Checkbox 
                                                        checked={selectedCategories.includes(option.value)}
                                                        onChange={handleCheckboxChange}
                                                        value={option.value}
                                                     />}
                                            label={option.label}
                                        />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            
                        )
                    }
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <List component='nav' sx={{
                            px: 0,
                            py: 0,
                            mt: '1rem',
                            '& .MuiListItemButton-root': {
                                py: 1.5,
                                '& .MuiAvatar-root': avatarSX,
                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                            }
                        }}>
                            <ListItemButton divider onClick={handleStart} sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.main' } }} >
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            color: 'success.main',
                                            bgcolor: 'success.lighter'
                                        }}
                                    >
                                        <PlayCircleOutlined />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={<Typography variant="subtitle1" sx={{ color: '#ffffff' }}>Reproducir Ejercicio</Typography>} />
                            </ListItemButton>
                        </List>
                    </Grid>
                </Grid>  
            </Grid>
        </MainCard>    
    )
}