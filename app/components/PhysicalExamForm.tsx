'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';

import InputAdornment from '@mui/material/InputAdornment';
import { Box, Grid, InputLabel, Select, Stack, Switch, Typography, Checkbox, RadioGroup, FormControlLabel, Radio, Collapse, Alert, IconButton } from '@mui/material';
import { bool, number } from 'yup';


import CloseIcon from '@mui/icons-material/Close';


function PhysicalExamForm({currentTab, setCurrentTab, info, setInfo}:{currentTab: string, setCurrentTab: (tab: string) => void, info: any, setInfo: (inf: any) => void}) {

  

const [peso_paciente, setPesoPaciente] = React.useState(info.pesokg);
const [altura_paciente, setAlturaPaciente] = React.useState(info.alturacm);
const [motivo_sem_teste_de_gravidez_paciente, setMotivoSemTesteDeGravidezPaciente] = React.useState(info.seSemTesteDeGravidezPorque);
const [quais_alteracoes_no_resultado_inspecao_genital_paciente, setQuaisAlteracoesNoResultadoInspecaoGenitalPaciente] = React.useState(info.qualAlteracaoInspecaoGenital);
const [quais_alteracoes_no_resultado_exame_especular_paciente, setQuaisAlteracoesNoResultadoExameEspecularPaciente] = React.useState(info.qualAlteracaoExameEspecular);

  

const [teste_de_gravidez_alterado, set_teste_de_gravidez_alterado] = React.useState(info.resultadoTesteGravidez);

const handleTesteDeGravidezAlterado = (event: React.ChangeEvent<HTMLInputElement>) => {
  set_teste_de_gravidez_alterado((event.target as HTMLInputElement).value);
};



  const [realizou_teste_de_gravidez, set_realizou_teste_de_gravidez] = React.useState(info.realizouTesteGravidez);
  const [disable_porque_falta_teste_gravidez, set_disable_porque_falta_teste_gravidez] = React.useState(false);
  const [disable_teste_gravidez_reagente, set_disable_teste_gravidez_reagente] = React.useState(false);
  
  
  
  const handleRealizouTesteDeGravidez = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_realizou_teste_de_gravidez((event.target as HTMLInputElement).value);
    if((event.target as HTMLInputElement).value === 'no')
    {
      set_disable_porque_falta_teste_gravidez(false);
      set_disable_teste_gravidez_reagente(true);
      set_teste_de_gravidez_alterado('NA');
    }
    else
    {
      set_disable_porque_falta_teste_gravidez(true);
      set_disable_teste_gravidez_reagente(false);
      setMotivoSemTesteDeGravidezPaciente('NA');
    }
  };


 
  const [resultado_inspecao_genital_alterado, set_resultado_inspecao_genital_alterado] = React.useState('');

  const [disable_quais_alteracoes_no_resultado_inspecao_genital_paciente, setDisableQuaisAlteracoesNoResultadoInspecaoGenitalPaciente] = React.useState(false);

  const handleResultadoDaInspecaoGenitalAlterado = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    set_resultado_inspecao_genital_alterado((event.target as HTMLInputElement).value);
    
    if((event.target as HTMLInputElement).value === 'no')
    {
      setDisableQuaisAlteracoesNoResultadoInspecaoGenitalPaciente(true);
      setQuaisAlteracoesNoResultadoInspecaoGenitalPaciente('Nenhuma');
    }
    else
    {
      setDisableQuaisAlteracoesNoResultadoInspecaoGenitalPaciente(false);
      setQuaisAlteracoesNoResultadoInspecaoGenitalPaciente('');
    }
  };


  const [resultado_exame_especular_alterado, set_resultado_exame_especular_alterado] = React.useState('');
  
  const [disable_quais_alteracoes_no_resultado_exame_especular_paciente, setDisableQuaisAlteracoesNoResultadoExameEspecularPaciente] = React.useState(false);

  const handleResultadoDoExameEspecularAlterado = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_resultado_exame_especular_alterado((event.target as HTMLInputElement).value);

    if((event.target as HTMLInputElement).value === 'no')
    {
      setDisableQuaisAlteracoesNoResultadoExameEspecularPaciente(true);
      setQuaisAlteracoesNoResultadoExameEspecularPaciente('Nenhuma');
    }
    else
    {
      setDisableQuaisAlteracoesNoResultadoExameEspecularPaciente(false);
      setQuaisAlteracoesNoResultadoExameEspecularPaciente('');
    }
  };

  
  const [open, setOpen] = React.useState(false);

  const updateInfofromForm = () => {
    // Use the spread operator to create a copy of the current dictionary
    const updatedInfo = { ...info };

    // Update or add a new key-value pair
    updatedInfo.alturacm=altura_paciente;
    updatedInfo.pesokg=peso_paciente;
    updatedInfo.imc= (parseInt(peso_paciente)/(parseInt(altura_paciente)/100 * parseInt(altura_paciente)/100)).toString();
    updatedInfo.realizouTesteGravidez= realizou_teste_de_gravidez;
    updatedInfo.resultadoTesteGravidez= teste_de_gravidez_alterado;
    updatedInfo.seSemTesteDeGravidezPorque=motivo_sem_teste_de_gravidez_paciente;

    updatedInfo.qualAlteracaoInspecaoGenital= quais_alteracoes_no_resultado_inspecao_genital_paciente;
   
    updatedInfo.qualAlteracaoExameEspecular= quais_alteracoes_no_resultado_exame_especular_paciente;


    setInfo(updatedInfo);

    
}
  return (
    
    <Box sx={{ display: 'flex', height: '100%',  flexDirection: 'column', p: 2 }}>


            <Grid container spacing={2} padding={2}>
                
            <Grid item xs={12} sm={4}>
                        <TextField
                            label="Altura (cm)"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={altura_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '')){setAlturaPaciente(event.target.value)}}}
                            
                            fullWidth
                            />
                </Grid>
                <Grid item xs={12} sm={4}>
                        <TextField
                            label="Peso (kg)"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={peso_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '')){setPesoPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography>IMC:</Typography>
                    <Typography>{parseInt(peso_paciente)/(parseInt(altura_paciente)/100 * parseInt(altura_paciente)/100)}</Typography>
                </Grid>


                 <Grid item xs={12} sm={4}>
                        <Typography>Fez teste de gravidez?</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={realizou_teste_de_gravidez}
                              onChange={handleRealizouTesteDeGravidez}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>
                        </Stack>
                </Grid>

                
                <Grid item xs={12} sm={4}>
                        <Typography>Resultado do teste de gravidez foi reagente?</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={teste_de_gravidez_alterado}
                              onChange={handleTesteDeGravidezAlterado}
                              >
                                <FormControlLabel disabled={disable_teste_gravidez_reagente} value="Nao Reagente" control={<Radio />} label="Não Reagente" />
                                <FormControlLabel disabled={disable_teste_gravidez_reagente} value="Reagente" control={<Radio />} label="Reagente" />
                            </RadioGroup>
                        </Stack>
                </Grid>


                <Grid item xs={12} sm={4}>
                        <TextField
                            disabled={disable_porque_falta_teste_gravidez}
                            label="Se teste de gravidez não foi realizado, por que?"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={motivo_sem_teste_de_gravidez_paciente}
                            onChange={(event)=>{setMotivoSemTesteDeGravidezPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>Resultado da inspeção genital alterado?*</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={resultado_inspecao_genital_alterado}
                              onChange={handleResultadoDaInspecaoGenitalAlterado}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>
                        </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                        <TextField
                            disabled={disable_quais_alteracoes_no_resultado_inspecao_genital_paciente}
                            label="Se alterações, quais?"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={quais_alteracoes_no_resultado_inspecao_genital_paciente}
                            onChange={(event)=>{setQuaisAlteracoesNoResultadoInspecaoGenitalPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                
                <Grid item xs={12} sm={6}>
                        <Typography>Resultado exame especular alterado?*</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={resultado_exame_especular_alterado}
                              onChange={handleResultadoDoExameEspecularAlterado}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>
                        </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                        <TextField
                            disabled={disable_quais_alteracoes_no_resultado_exame_especular_paciente}
                            label="Se alterações, quais?"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={quais_alteracoes_no_resultado_exame_especular_paciente}
                            onChange={(event)=>{setQuaisAlteracoesNoResultadoExameEspecularPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

            </Grid>


                
            
            
  
      
                
            
    <Grid item xs={12} sm={12}>
        <Button type="submit" variant='contained' sx={{bgcolor: '#265D9B'}} onClick={() => {
           /*  setOpen(true); */
            updateInfofromForm();
            setCurrentTab('4');
            }}>
            Próximo
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

export default PhysicalExamForm;