import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';

const SettingsGameForm = ({ typeForm, defaultValues }) => {
   const rounds = Array.from({ length: 12 }, (_, index) => ({
      value: index + 1,
      label: (index + 1).toString(),
   }));
   const objetos = [
      { value: "frutas", label: "Frutas" },
      { value: "comida", label: "Alimentos" },
      { value: "casa", label: "Objetos del hogar" }
   ]

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
                  InputLabelProps={{
                     style: { fontSize: '18.5px' } // Ajusta el tamaño de fuente según tus necesidades
                  }}
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
                        style: { fontSize: '18.5px' } // Ajusta el tamaño de fuente según tus necesidades
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
            <Button variant="contained">Guardar Cambios</Button>
         </Box>
      </>

   );
};

export default SettingsGameForm;