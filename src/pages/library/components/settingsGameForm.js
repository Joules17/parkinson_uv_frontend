import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useExternalApi as useGameListResponse } from 'hooks/listGamesResponse'

const SettingsGameForm = ({ typeForm, list, onListUpdate, idGame }) => {
   const {updateSettingGameList} = useGameListResponse()
   const [newSettings, setNewSettings] = useState(undefined)
   const gameListState = useSelector((state) => state.gamesList);
   const [modifiedList, setModifiedList] = useState(gameListState.gamesList);
   const rounds = Array.from({ length: 12 }, (_, index) => ({
      value: index + 1,
      label: (index + 1).toString(),
   }));
   const objetos = [
      { value: "frutas", label: "Frutas" },
      { value: "comida", label: "Alimentos" },
      { value: "casa", label: "Objetos del hogar" }
   ]

   const selectedGame = modifiedList.games.find((juego) => juego.name === typeForm);
   const valueRounds = selectedGame ? selectedGame.setting.rondas : 1;
   

   const handleRoundsChange = (event) => {
      const selectedRounds = event.target.value;
      setNewSettings({"rondas": selectedRounds})
      const updatedList = JSON.parse(JSON.stringify(modifiedList));
      updatedList.games.forEach((juego) => {
         if (juego.name === typeForm) {
            juego.setting.rondas = selectedRounds;
         }
      });
      setModifiedList(updatedList);
   };

   const handleFormSubmit = () => {
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
                  id="outlined-select-currency"
                  select
                  label="Número de rondas"
                  defaultValue="1"
                  value={valueRounds}
                  InputLabelProps={{
                     style: { fontSize: '18.5px' } // Ajusta el tamaño de fuente según tus necesidades
                  }}
                  onChange={handleRoundsChange}
               >
                  {rounds.map((option) => (
                     <MenuItem key={option.value} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </TextField>
               {typeForm === "Frutas" && (
                  <TextField
                     id="outlined-select-currency"
                     select
                     label="Objetos"
                     defaultValue="frutas"
                     InputLabelProps={{
                        style: { fontSize: '18.5px' } 
                     }}
                  >
                     {objetos.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </TextField>
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