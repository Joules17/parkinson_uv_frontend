import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box, FormControlLabel, FormGroup, Checkbox, FormLabel, FormControl } from '@mui/material';
import { useSelector } from 'react-redux';
import { useExternalApi as useGameListResponse } from 'hooks/listGamesResponse'

const SettingsGameForm = ({ typeForm, list, onListUpdate, idGame }) => {
   const { updateSettingGameList } = useGameListResponse()
   const [newSettings, setNewSettings] = useState(undefined)
   const gameListState = useSelector((state) => state.gamesList);
   const [modifiedList, setModifiedList] = useState(gameListState.gamesList);
   const [selectedCategories, setSelectedCategories] = useState([]);
   const objetos = [
      { value: "frutas", label: "Frutas" },
      { value: "comida", label: "Alimentos" },
      { value: "casa", label: "Objetos del hogar" },
      { value: "animales", label: "Animales" }
   ]

   const selectedGame = modifiedList.games.find((juego) => juego.name === typeForm);
   // const valueRounds = selectedGame ? selectedGame.setting.rondas : 1;
   // const valueObjects = selectedGame ? selectedGame.setting.rondas : 1;
   // const valueObjects = selectedGame ? selectedGame.setting.rondas : 1;


   const [valueRounds, setValueRounds] = useState(10);
   const [valueObjects, setValueObjects] = useState(5);
   const [valueTries, setValueTries] = useState(3);
   const [valueLevels, setValueLevels] = useState(3);
   const [valueWorldMinLength, setValueWorldMinLength] = useState(2);
   const [valueWordLength, setValueWordLength] = useState(10);
   const [valueFirstRoundArrow, setValueFirstRoundArrow] = useState(10);
   const [valueSecondRoundArrow, setValueSecondRoundArrow] = useState(10);
   const [wordsperlevel, setWordsperlevel] = useState(4);

   useEffect(() => {
      if (selectedGame && selectedGame.setting) {
         setValueRounds(selectedGame.setting.rondas || 10);
         setValueObjects(selectedGame.setting.number_objects || 5);
         setValueTries(selectedGame.setting.tries || 3)
         setValueLevels(selectedGame.setting.niveles || 3)
         setValueWorldMinLength(selectedGame.setting.longitudMinPalabra || 2)
         setValueWordLength(selectedGame.setting.longitudPalabra || 10)
         setValueFirstRoundArrow(selectedGame.setting.rondasFirstArrow || 10)
         setValueSecondRoundArrow(selectedGame.setting.rondasSecondArrow || 10)
         setWordsperlevel(selectedGame.setting.wordsperlevel || 4)
      }
   }, [selectedGame]);

   useEffect(() => {
      setModifiedList(gameListState.gamesList)
   }, [gameListState]);

   const handleSettingChange = (event, settingKey) => {
      const selectedValue = event.target.value;
      const updatedList = JSON.parse(JSON.stringify(modifiedList));
      setNewSettings(prevSettings => ({
         ...prevSettings,
         [settingKey]: selectedValue,
      }));
      updatedList.games.forEach((juego) => {
         if (juego.name === typeForm) {
            juego.setting[settingKey] = selectedValue;
         }
      });
      setModifiedList(updatedList);
      console.log(updatedList)
   };

   const handleRoundsChange = (event) => {
      handleSettingChange(event, 'rondas');
   };

   const handleObjectsChange = (event) => {
      handleSettingChange(event, 'number_objects');
   };

   const handleTriesChange = (event) => {
      handleSettingChange(event, 'tries');
   };

   const handleLevelsChange = (event) => {
      handleSettingChange(event, 'niveles');
   };

   const handleValueWorldMinLength = (event) => {
      handleSettingChange(event, 'longitudMinPalabra');
   }

   const handleValueWorldLength = (event) => {
      handleSettingChange(event, 'longitudPalabra');
   };

   const handleValueFirstRoundArrow = (event) => {
      handleSettingChange(event, 'rondasFirstArrow');
   };

   const handleValueSecondRoundArrow = (event) => {
      handleSettingChange(event, 'rondasSecondArrow');
   };

   const handleWordsPerLevelChange = (event) => {
      handleSettingChange(event, 'wordsperlevel');
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

   const handleFormSubmit = () => {
      setNewSettings(prevSettings => ({
         ...prevSettings,
         categorias: selectedCategories,
      }));
      updateSettingGameList(idGame, newSettings)
      onListUpdate(modifiedList);
   };

   return (
      <>
         <Box
            component="form"
            sx={{
               '& .MuiTextField-root': { m: 1, width: '20ch' },
            }}
            noValidate
            autoComplete="off"
         >
            <div>
               <TextField
                  type="number"
                  label="Número de Rondas"
                  InputProps={{
                     inputProps: { min: 0 }
                  }}
                  value={valueRounds}
                  onChange={handleRoundsChange}
               />

               <TextField
                  type="number"
                  label="Número de Intentos"
                  InputProps={{
                     inputProps: { min: 0 }
                  }}
                  value={valueTries}
                  onChange={handleTriesChange}
                  fullWidth
               />

               {(typeForm === "Recuerda y Encuentra" || typeForm === 'Objeto Intruso' || typeForm === 'Letras Marinas' || typeForm === 'Fotografias Misteriosas') && (
                  <FormControl fullWidth>
                     <FormLabel component='legend' >
                        Categorías
                     </FormLabel>
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

               )}

               {(typeForm === 'Fotografias Misteriosas') && (
                  <TextField
                     type="number"
                     label="Número de Objetos"
                     InputProps={{
                        inputProps: { min: 0 }
                     }}
                     value={valueObjects}
                     onChange={handleObjectsChange}
                     fullWidth
                  />
               )}

               {(typeForm === 'Recuerda y Encuentra' || typeForm === 'Letras Marinas' || typeForm === 'Fotografias Misteriosas') && (
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
               )}

               {typeForm === 'Palabras Ocultas' && (
                  <>
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
                  </>
               )}

               {typeForm === 'Flechas Articas' && (
                  <>
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
                  </>
               )}

               {typeForm === 'Letras Marinas' && (
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
            </div>
         </Box>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
            <Button variant="contained" onClick={handleFormSubmit}>Guardar Cambios</Button>
         </Box>
      </>

   );
};

export default SettingsGameForm;