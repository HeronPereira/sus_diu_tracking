'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';

import InputAdornment from '@mui/material/InputAdornment';
import { Alert, Box, Collapse, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, Radio, RadioGroup, Select, Stack, Switch, Typography } from '@mui/material';
import { bool, number } from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';


import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';


/* Data (calcular o tempo de permanência com o DIU);
Motivo da remoção;
Prescrição de novo contraceptivo;
Será inserido novo DIU?
 */

function DiuRemovalForm({currentTab, setCurrentTab, info, setInfo}:{currentTab: string, setCurrentTab: (tab: string) => void, info: any, setInfo: (inf: any) => void}) {

  
  const [data_remocao_paciente, setDataRemocaoPaciente] = useState(info.dataRemocaoDIU);
  const [motivo_remocao_paciente, setMotivoRemocaoPaciente] = useState(info.motivoRemocaoDIU);
  const [prescricao_novo_contraceptivo_paciente, setPrescricaoNovoContraceptivoPaciente] = useState(info.prescricaoOutroContraceptivo);
  const [newDIU, setNewDIU] = React.useState(info.seraInseridoNovoDIU);

  const handleNewDIUOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDIU((event.target as HTMLInputElement).value);
  };

  
  const [open, setOpen] = React.useState(false);

  const updateInfofromForm = () => {
    // Use the spread operator to create a copy of the current dictionary
    const updatedInfo = { ...info };

    // Update or add a new key-value pair
    updatedInfo.dataRemocaoDIU=data_remocao_paciente?.format('YYYY/MM/DD');
    updatedInfo.motivoRemocaoDIU=motivo_remocao_paciente;
    updatedInfo.prescricaoOutroContraceptivo=prescricao_novo_contraceptivo_paciente;
    updatedInfo.seraInseridoNovoDIU=newDIU;

    setInfo(updatedInfo);

    
}

  return (
    
    <Box sx={{ display: 'flex', height: '100vh',  flexDirection: 'column', p: 2 }}>


            <Grid container spacing={2} padding={2}>
                
            <Grid item xs={12} sm={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={
                            (event)=>{

                            setDataRemocaoPaciente(event)
                        
                        }
                            } value={data_remocao_paciente}
                            
                            format="DD/MM/YYYY" label="Data de remoção do DIU"/>
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={12}>
                        <TextField
                            label="Motivo da remoção"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={motivo_remocao_paciente}
                            onChange={(event)=>{setMotivoRemocaoPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={12}>
                        <TextField
                            label="Prescrição de novo contraceptivo"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={prescricao_novo_contraceptivo_paciente}
                            onChange={(event)=>{setPrescricaoNovoContraceptivoPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <FormLabel id="demo-controlled-radio-buttons-group">Será inserido novo DIU?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={newDIU}
                      onChange={handleNewDIUOption}
                    >
                      <FormControlLabel value="no" control={<Radio />} label="Não" />
                      <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                    </RadioGroup>
                </Grid>


            </Grid>
       
  
     
                
            
    <Grid item xs={12} sm={12}>
        <Button type="submit" variant='contained' sx={{bgcolor: '#265D9B'}} onClick={() => {
            setOpen(true);
            updateInfofromForm();
            }}>
            Gravar
        </Button>

        <Collapse in={open}>
            <Alert
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setOpen(false);
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={{ mb: 2 }}
            >
            {JSON.stringify(info)}
            </Alert>
        </Collapse>
    </Grid>  
  
    </Box>
  );
};

export default DiuRemovalForm;

