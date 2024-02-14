'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Alert, Backdrop, Box, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import dayjs, { Dayjs } from 'dayjs';


/* Data (calcular o tempo de permanência com o DIU);
Motivo da remoção;
Prescrição de novo contraceptivo;
Será inserido novo DIU?
 */

function DiuRemovalForm({goBackFirstTab, info, setInfo, setReady}:{goBackFirstTab: (inf: string) => void, info: any, setInfo: (inf: any) => void,  setReady: (inf: boolean) => void}) {
  
  // Use the spread operator to create a copy of the current dictionary
  const updatedInfo = { ...info };
  
  const [data_remocao_paciente, setDataRemocaoPaciente] = useState(info.dataRemocaoDIU);
  const [motivo_remocao_paciente, setMotivoRemocaoPaciente] = useState(info.motivoRemocaoDIU);
  const [prescricao_novo_contraceptivo_paciente, setPrescricaoNovoContraceptivoPaciente] = useState(info.prescricaoOutroContraceptivo);
  const [newDIU, setNewDIU] = React.useState(info.seraInseridoNovoDIU);

  const handleNewDIUOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDIU((event.target as HTMLInputElement).value);
  };

  
  const [backdrop_show, setBackdropShow] = useState(false);
  const [mustRegisterPersonalDataFirst, setMustRegisterPersonalDataFirst] = useState(false);
  
  const checkAllFieldsAreFine = () => {
  
      if (data_remocao_paciente == '' || data_remocao_paciente == undefined || data_remocao_paciente == null)
      {
          return false;
      }
      else if (motivo_remocao_paciente == '' || motivo_remocao_paciente == undefined || motivo_remocao_paciente == null)
      {
          return false;
      }
      else if (prescricao_novo_contraceptivo_paciente == '' || prescricao_novo_contraceptivo_paciente == undefined || prescricao_novo_contraceptivo_paciente == null)
      {
          return false;
      }
      else if (newDIU == '' || newDIU == undefined || newDIU == null)
      {
          return false;
      }
      else
      {
          return true;
      }
  }
  
  
  const handleSend = () => {
          if(info['cpf'] == '')
          {
              // Tem que cadastrar o paciente primeiro
              // Sobe Backdrop informando isso
              setMustRegisterPersonalDataFirst(true);
              // Botão de retornar que irá baixar o popup e voltar para tela de cadastro
          }
          else if(checkAllFieldsAreFine())
          {

            updatedInfo['dataRemocaoDIU'] = data_remocao_paciente;
            updatedInfo['motivoRemocaoDIU'] = motivo_remocao_paciente;
            updatedInfo['prescricaoOutroContraceptivo'] = prescricao_novo_contraceptivo_paciente;
            updatedInfo['seraInseridoNovoDIU'] = newDIU;
        
            
            setInfo(updatedInfo);
            setReady(true);
  
              
          }
          else
          {
              setBackdropShow(true);
          }
          
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
                            } value={dayjs(data_remocao_paciente)}
                            
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
        <Button variant='contained' sx={{bgcolor: '#265D9B'}} onClick={handleSend}>
            Gravar
        </Button>
    </Grid>  
            
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop_show}
        
      >
        <Paper elevation={3}  sx={{display: 'flex', bgcolor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '40%', width: '40%'}}>
            <Typography variant='h5' fontWeight={'bold'} sx={{margin:'20px'}}>Preencha os campos corretamente!</Typography>
            <Button variant='contained' sx={{bgcolor: '#265D9B'}} size='large' onClick={() => {setBackdropShow(false)}}>Ok</Button>
        </Paper>;
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={mustRegisterPersonalDataFirst}
        
      >
        <Paper elevation={3}  sx={{display: 'flex', bgcolor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '40%', width: '40%'}}>
            <Typography variant='h5' fontWeight={'bold'} sx={{margin:'20px'}}>É necessário cadastrar os dados pessoais primeiro!</Typography>
            <Button variant='contained' sx={{bgcolor: '#265D9B'}} size='large' onClick={() => {setMustRegisterPersonalDataFirst(false); goBackFirstTab('1')}}>Ok</Button>
        </Paper>;
      </Backdrop>
  
    </Box>
  );
};

export default DiuRemovalForm;

