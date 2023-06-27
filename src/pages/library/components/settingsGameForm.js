import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';

const SettingsGameForm = ({ typeForm, list, onListUpdate }) => {

   const [modifiedList, setModifiedList] = useState(list);
   const rounds = Array.from({ length: 12 }, (_, index) => ({
      value: index + 1,
      label: (index + 1).toString(),
   }));
   const objetos = [
      { value: "frutas", label: "Frutas" },
      { value: "comida", label: "Alimentos" },
      { value: "casa", label: "Objetos del hogar" }
   ]

   const selectedGame = modifiedList.juegos.find((juego) => juego.name === typeForm);
   const defaultRounds = selectedGame ? selectedGame.settings.rondas : 1;

   const handleRoundsChange = (event) => {
      const selectedRounds = event.target.value;
      const updatedList = JSON.parse(JSON.stringify(modifiedList));
      console.log(updatedList)
      updatedList.juegos.forEach((juego) => {
         if (juego.name === typeForm) {
            console.log("hola")
            console.log(juego.settings)
            juego.settings.rondas = selectedRounds;
         }
      });
      setModifiedList(updatedList);
   };

   const handleFormSubmit = () => {
      // Realiza las modificaciones en modifiedList según tus necesidades
      // ...

      // Llama a la función de devolución de llamada para pasar la lista modificada a ModalGames
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
                  value={defaultRounds}
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