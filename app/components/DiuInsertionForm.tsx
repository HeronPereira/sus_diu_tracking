'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';

import InputAdornment from '@mui/material/InputAdornment';
import { Box, Grid, InputLabel, Select, Slider, Stack, Switch, Typography, Checkbox, RadioGroup, FormControlLabel, Radio, Collapse, Alert, IconButton, Backdrop, Paper } from '@mui/material';
import { bool, number } from 'yup';

import CloseIcon from '@mui/icons-material/Close';
import { getCentroSaudeReferencia } from '../utils/utils';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';



function DiuInsertionForm ({goBackFirstTab, info, setInfo, setReady}:{goBackFirstTab: (inf: string) => void, info: any, setInfo: (inf: any) => void,  setReady: (inf: boolean) => void}) {
  
  // Use the spread operator to create a copy of the current dictionary
  const updatedInfo = { ...info };


  const [data_insercao_paciente, setDataInsercaoPaciente] = useState(info['dataInsercao']);
  const [motivo_diu_nao_inserido_paciente, setMotivoDiuNaoInseridoPaciente] = useState(info['seDiuNaoInseridoPorque']);
  const [antissepsia_realizada_com_paciente, setAntissepsiaRealizadaComPaciente] = useState(info['antissepsiaRealizadaCom']);
  const [histerometria_paciente, setHisterometriaPaciente] = useState(info['histerometriaCm']);
  const [tamanho_fio_paciente, setTamanhoFioPaciente] = useState(info['tamanhoFioCm']);
  const [modelo_diu_paciente, setModeloDiuPaciente] = useState(info['modeloDiu']);
  const [lote_diu_paciente, setLoteDiuPaciente] = useState(info['loteDiu']);
  const [intercorrencias_diu_paciente, setIntercorrenciasDiuPaciente] = useState(info['intercorrenciasDiu']);
  const [nivel_dor_paciente, setNivelDorPaciente] = useState(info['nivelDor']);
  const [profissional_inseriu_nome_paciente, setProfissionalInseriuNomePaciente] = useState(info['profissionalInseriuNome']);
  const [profissional_inseriu_crm_coren_paciente, setProfissionalInseriuCrmCorenPaciente] = useState(info['profissionalInseriuCRMCoren']);
  const [centro_saude_insercao_paciente, setCentroSaudeInsercaoPaciente] = useState(info['centroSaudeInsercao']);

  const [profissional_auxiliar_nome_paciente, setProfissionalAuxiliarNomePaciente] = useState(info['profissionalAuxiliarNome']);
  const [profissional_auxiliar_crm_coren_paciente, setProfissionalAuxiliarCrmCorenPaciente] = useState(info['profissionalAuxiliarCRMCoren']);


  const [diu_foi_inserido, set_diu_foi_inserido] = useState(info['diuInserido']);
  const [disable_motivo_diu_nao_inserido, set_disable_motivo_diu_nao_inserido] = useState(false);

  const handleDiuFoiInserido = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_diu_foi_inserido((event.target as HTMLInputElement).value);
    if((event.target as HTMLInputElement).value === 'yes')
    {
      set_disable_motivo_diu_nao_inserido(true);
      setMotivoDiuNaoInseridoPaciente('Inserido');
    }
    else
    {
      set_disable_motivo_diu_nao_inserido(false);
      setMotivoDiuNaoInseridoPaciente('');
    }
  };


  const [fez_uso_previo_aine, set_fez_uso_previo_aine] = useState(info['usoPrevioAINE']);

  const handleFezUsoPrevioAine = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_fez_uso_previo_aine((event.target as HTMLInputElement).value);
  };


  const [uso_de_segundo_profissional, set_uso_de_segundo_profissional] = useState(info['auxilioSegundoProfissional']);
  const [disable_segundo_profissional, set_disable_segundo_profissional] = useState(false);
  const handleUsoDeSegundoProfissional = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_uso_de_segundo_profissional((event.target as HTMLInputElement).value);

    if((event.target as HTMLInputElement).value === 'no')
    {
      set_disable_segundo_profissional(true);
    }
    else
    {
      set_disable_segundo_profissional(false);
    }

  };



const [backdrop_show, setBackdropShow] = useState(false);
  const [mustRegisterPersonalDataFirst, setMustRegisterPersonalDataFirst] = useState(false);
  
  const checkAllFieldsAreFine = () => {
  
      if ((/^\d+$/.test(histerometria_paciente) == false) || (histerometria_paciente.length >= 3))
      {
          return false; 
      }
      else if ((/^\d+$/.test(tamanho_fio_paciente) == false) || (tamanho_fio_paciente.length >= 3))
      {
          return false; 
      }
      else if (lote_diu_paciente == '' || lote_diu_paciente == undefined || lote_diu_paciente == null)
      {
          return false;
      }
      else if ((/^\d+$/.test(nivel_dor_paciente) == false) || (nivel_dor_paciente.length >= 3))
      {
          return false; 
      }
      else if (profissional_inseriu_nome_paciente == '' || profissional_inseriu_nome_paciente == undefined || profissional_inseriu_nome_paciente == null)
      {
          return false;
      }
      else if (profissional_inseriu_crm_coren_paciente == '' || profissional_inseriu_crm_coren_paciente == undefined || profissional_inseriu_crm_coren_paciente == null)
      {
          return false;
      }
      else if (centro_saude_insercao_paciente == '' || centro_saude_insercao_paciente == undefined || centro_saude_insercao_paciente == null)
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
            // const [modelo_diu_paciente, setModeloDiuPaciente] = useState(info['modeloDiu']);
            updatedInfo['dataInsercao'] = data_insercao_paciente;
            updatedInfo['diuInserido'] = diu_foi_inserido;
            updatedInfo['seDiuNaoInseridoPorque'] = motivo_diu_nao_inserido_paciente;
            updatedInfo['usoPrevioAINE'] = fez_uso_previo_aine;
            updatedInfo['antissepsiaRealizadaCom'] = antissepsia_realizada_com_paciente;
            updatedInfo['histerometriaCm'] = histerometria_paciente;
            updatedInfo['tamanhoFioCm'] = tamanho_fio_paciente;
            updatedInfo['modeloDiu'] = modelo_diu_paciente;
            updatedInfo['loteDiu'] = lote_diu_paciente;
            updatedInfo['intercorrenciasDiu'] = intercorrencias_diu_paciente;
            updatedInfo['nivelDor'] = nivel_dor_paciente.toString();
            updatedInfo['profissionalInseriuNome'] = profissional_inseriu_nome_paciente;
            updatedInfo['profissionalInseriuCRMCoren'] = profissional_inseriu_crm_coren_paciente;
            updatedInfo['centroSaudeInsercao'] = centro_saude_insercao_paciente;
            updatedInfo['auxilioSegundoProfissional'] = uso_de_segundo_profissional;
            updatedInfo['profissionalAuxiliarNome'] = profissional_auxiliar_nome_paciente;
            updatedInfo['profissionalAuxiliarCRMCoren'] = profissional_auxiliar_crm_coren_paciente;
        
            setInfo(updatedInfo);
            setReady(true);
  
              
          }
          else
          {
              setBackdropShow(true);
          }
          
      }


  return (
    
    <Box sx={{ display: 'flex', height: '100%',  flexDirection: 'column', p: 2 }}>

            <Grid container spacing={2} padding={2}>

            <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={
                            (event)=>{

                            setDataInsercaoPaciente(event)
                        
                        }
                            } value={dayjs(data_insercao_paciente)}
                            
                            format="DD/MM/YYYY" label="Data de acompanhamento"/>
                    </LocalizationProvider>
                </Grid>
                
            <Grid item xs={12} sm={2}>
                        <Typography>O DIU foi inserido?</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={diu_foi_inserido}
                              onChange={handleDiuFoiInserido}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>
                        </Stack>
                </Grid>

              <Grid item xs={12} sm={10}>
                        <TextField
                            disabled={disable_motivo_diu_nao_inserido}
                            label="Porque o DIU não foi inserido?"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={motivo_diu_nao_inserido_paciente}
                            onChange={(event)=>{setMotivoDiuNaoInseridoPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={2}>
                        <Typography>Fez uso prévio de AINE?</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={fez_uso_previo_aine}
                              onChange={handleFezUsoPrevioAine}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>
                        </Stack>
                </Grid>

                <Grid item xs={12} sm={4}>
                        <InputLabel id="demo-simple-select-label">Antissepsia realizada com: </InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={antissepsia_realizada_com_paciente}
                        label="Gestações anteriores"
                        onChange={(event)=>{setAntissepsiaRealizadaComPaciente(event.target.value as string)}}
                        autoWidth
                        >
                          
                    <MenuItem value={'polvidine'}>polvidine</MenuItem>
                    <MenuItem value={'clorexidina'}>clorexidina</MenuItem>
                    <MenuItem value={'outro'}>outro</MenuItem>
                    </Select>
                </Grid>


                <Grid item xs={12} sm={5}>
                        <TextField
                            required={true}
                            label="Histerometria (em cm)"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={histerometria_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '')&&(event.target.value.length <= 2)){setHisterometriaPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={3}>
                        <TextField
                            required={true}
                            label="Tamanho do fio (em cm)"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={tamanho_fio_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '')&&(event.target.value.length <= 2)){setTamanhoFioPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Modelo do DIU"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={modelo_diu_paciente}
                            onChange={(event)=>{setModeloDiuPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                
                <Grid item xs={12} sm={3}>
                        <TextField
                            required={true}
                            label="Lote do DIU"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={lote_diu_paciente}
                            onChange={(event)=>{setLoteDiuPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                
                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Intercorrências do DIU"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={intercorrencias_diu_paciente}
                            onChange={(event)=>{setIntercorrenciasDiuPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>Nível de dor*</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Typography>0</Typography>
                            <Slider aria-label='always-visible' min={0} max={10} valueLabelDisplay='on' value={parseInt(nivel_dor_paciente)} onChange={(event)=>{if(event.target){ setNivelDorPaciente((event.target as HTMLInputElement).value)}}}/>
                            <Typography>10</Typography>
                        </Stack>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                        <Typography>Profissional que inseriu*</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                          <TextField
                            required={true}
                            label="Nome"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={profissional_inseriu_nome_paciente}
                            onChange={(event)=>{setProfissionalInseriuNomePaciente(event.target.value)}}
                            fullWidth
                            />

                            <TextField
                            required={true}
                            label="CRM/COREN"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={profissional_inseriu_crm_coren_paciente}
                            onChange={(event)=>{setProfissionalInseriuCrmCorenPaciente(event.target.value)}}
                            fullWidth
                            />
                        </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                        <InputLabel id="demo-simple-select-label">Centro de Saúde realizado a inserção do DIU*</InputLabel>
                        <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={centro_saude_insercao_paciente}
                        label="Centro de saúde de referência"
                        onChange={(event)=>{setCentroSaudeInsercaoPaciente(event.target.value)}}
                        fullWidth
                        >
                            <MenuItem value={'Abraão'}>Abraão</MenuItem>
                            <MenuItem value={'Agronômica'}>Agronômica</MenuItem>
                            <MenuItem value={'Alto Ribeirão'}>Alto Ribeirão</MenuItem>
                            <MenuItem value={'Armação'}>Armação</MenuItem>
                            <MenuItem value={'Balneário'}>Balneário</MenuItem>
                            <MenuItem value={'Barra da Lagoa'}>Barra da Lagoa</MenuItem>
                            <MenuItem value={'Cachoeira do Bom Jesus'}>Cachoeira do Bom Jesus</MenuItem>
                            <MenuItem value={'Caieira da Barra do Sul'}>Caieira da Barra do Sul</MenuItem>
                            <MenuItem value={'Campeche'}>Campeche</MenuItem>
                            <MenuItem value={'Canasvieiras'}>Canasvieiras</MenuItem>
                            <MenuItem value={'Canto da Lagoa'}>Canto da Lagoa</MenuItem>
                            <MenuItem value={'Capivari'}>Capivari</MenuItem>
                            <MenuItem value={'Capoeiras'}>Capoeiras</MenuItem>
                            <MenuItem value={'Carianos'}>Carianos</MenuItem>
                            <MenuItem value={'Centro'}>Centro</MenuItem>
                            <MenuItem value={'Coloninha'}>Coloninha</MenuItem>
                            <MenuItem value={'Coqueiros'}>Coqueiros</MenuItem>
                            <MenuItem value={'Córrego Grande'}>Córrego Grande</MenuItem>
                            <MenuItem value={'Costa da Lagoa'}>Costa da Lagoa</MenuItem>
                            <MenuItem value={'osteira do Pirajubaé'}>Costeira do Pirajubaé</MenuItem>
                            <MenuItem value={'Estreito'}>Estreito</MenuItem>
                            <MenuItem value={'Fazenda do Rio Tavares'}>Fazenda do Rio Tavares</MenuItem>
                            <MenuItem value={'Ingleses'}>Ingleses</MenuItem>
                            <MenuItem value={'Itacorubi'}>Itacorubi</MenuItem>
                            <MenuItem value={'Jardim Atlântico'}>Jardim Atlântico</MenuItem>
                            <MenuItem value={'João Paulo'}>João Paulo</MenuItem>
                            <MenuItem value={'Jurerê'}>Jurerê</MenuItem>
                            <MenuItem value={'Lagoa da Conceição'}>Lagoa da Conceição</MenuItem>
                            <MenuItem value={'Monte Cristo'}>Monte Cristo</MenuItem>
                            <MenuItem value={'Monte Serrat'}>Monte Serrat</MenuItem>
                            <MenuItem value={'Morro das Pedras'}>Morro das Pedras</MenuItem>
                            <MenuItem value={'Novo Continente'}>Novo Continente</MenuItem>
                            <MenuItem value={'Pantanal'}>Pantanal</MenuItem>
                            <MenuItem value={'Pântano do Sul'}>Pântano do Sul</MenuItem>
                            <MenuItem value={'Ponta das Canas'}>Ponta das Canas</MenuItem>
                            <MenuItem value={'Prainha'}>Prainha</MenuItem>
                            <MenuItem value={'Ratones'}>Ratones</MenuItem>
                            <MenuItem value={'Ribeirão da Ilha'}>Ribeirão da Ilha</MenuItem>
                            <MenuItem value={'Rio Tavares'}>Rio Tavares</MenuItem>
                            <MenuItem value={'Rio Vemelho'}>Rio Vemelho</MenuItem>
                            <MenuItem value={'Saco dos Limões'}>Saco dos Limões</MenuItem>
                            <MenuItem value={'Saco Grande'}>Saco Grande</MenuItem>
                            <MenuItem value={'Santinho'}>Santinho</MenuItem>
                            <MenuItem value={'Santo Antônio de Lisboa'}>Santo Antônio de Lisboa</MenuItem>
                            <MenuItem value={'Sapé'}>Sapé</MenuItem>
                            <MenuItem value={'Tapera'}>Tapera</MenuItem>
                            <MenuItem value={'Trindade'}>Trindade</MenuItem>
                            <MenuItem value={'Vargem Grande'}>Vargem Grande</MenuItem>
                            <MenuItem value={'Vargem Pequena'}>Vargem Pequena</MenuItem>
                            <MenuItem value={'Vila Aparecida'}>Vila Aparecida</MenuItem>
                            <MenuItem value={'Policlínica Centro'}>Policlínica Centro</MenuItem>
                            <MenuItem value={'Policlínica Rio Tavares'}>Policlínica Rio Tavares</MenuItem>
                            <MenuItem value={'Policlínica Continente'}>Policlínica Continente</MenuItem>
                            <MenuItem value={'Policlínica da Mulher e da Criança'}>Policlínica da Mulher e da Criança</MenuItem>
                    </Select>
                </Grid>



            </Grid>


            <Grid item xs={12} sm={6}>
                        <Typography>Auxilio de outro profissional?</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={uso_de_segundo_profissional}
                              onChange={handleUsoDeSegundoProfissional}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>

                            <TextField
                            disabled={disable_segundo_profissional}
                            label="Nome*"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={profissional_auxiliar_nome_paciente}
                            onChange={(event) => setProfissionalAuxiliarNomePaciente(event.target.value)}
                            fullWidth
                            />

                            <TextField
                            disabled={disable_segundo_profissional}
                            label="CRM/COREN*"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={profissional_auxiliar_crm_coren_paciente}
                            onChange={(event) => setProfissionalAuxiliarCrmCorenPaciente(event.target.value)}
                            fullWidth
                            />
                        </Stack>
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

export default DiuInsertionForm;

/* 


Local da inserção (Caixa de seleção com centros de saúde ou opção de outros).
Necessitou de auxílio de segundo profissional? Qual? (Nome e CRM/COREN)
 */