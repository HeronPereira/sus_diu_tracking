'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';

import { Box, Grid, InputLabel, Rating, Select, Slider, Stack, Checkbox, Typography, FormControl, SelectChangeEvent, Chip, RadioGroup, FormControlLabel, Radio, Collapse, Alert, IconButton } from '@mui/material';
import { bool, number } from 'yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';


function PostDiuInsertionForm ({currentTab, setCurrentTab, info, setInfo}:{currentTab: string, setCurrentTab: (tab: string) => void, info: any, setInfo: (inf: any) => void}) {

  const [data_acompanhamento_paciente, setDataAcompanhamentoPaciente] = useState(info.dataAcompanhamento);
  const [dias_sangramento_pos_insercao_paciente, setDiasSangramentoPosInsercaoPaciente] = useState(info.diasSangramentoPosInsercao);

 

  const [data_ultima_menstruacao_pos_insercao_paciente, setDataUltimaMenstruacaoPosInsercaoPaciente] = useState(info.dataUltimaMenstruacaoPosInsercao);
  const [dias_mestruada_pos_insercao_paciente, setDiasMestruadaPosInsercaoPaciente] = useState(info.diasMenstruadaPosInsercao);
  const [intervalo_ciclos_mestruais_pos_insercao_paciente, setIntervaloCiclosMestruaisPosInsercaoPaciente] = useState(info.intervaloDiasUltimoCicloPosInsercao);
  const [volume_menstrual_pos_insercao_paciente, setVolumeMenstrualPosInsercaoPaciente] = useState(info.volumeMenstrualPosInsercao);
  const [colicas_pos_insercao_paciente, setColicasPosInsercaoPaciente] = useState(info.colicasPosInsercao);
  const [tamanho_do_fio_pos_insercao_paciente, setTamanhoDoFioPosInsercaoPaciente] = useState(info.tamanhoFioCmPosInsercao);
  const [resultado_usg_pos_insercao_paciente, setResultadoUsgPosInsercaoPaciente] = useState(info.resultadoUSG);
  const [intercorrencias_alertadas_pos_insercao_paciente, setIntercoorrenciasAlertadasPosInsercaoPaciente] = useState(info.qualOutraIntercorrenciaPosInsercao);

  const labels: { [index: string]: string } = {
    1: 'Muito Insatisfeita',
    2: 'Insatisfeita',
    3: 'Médio',
    4: 'Satisfeita',
    5: 'Muito Satisfeita',
   
  };
  
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  
  const [nivel_de_satisfacao_paciente, setNivelDeSatisfacaoPaciente] = useState(info.nivelSatisfacaoInsercao);
    const [nivel_numerico, setNivelNumerico] = React.useState<number | null>(0);
    const [hover, setHover] = React.useState(-1);




    const intercorrencias = [
      'Gravidez',
      'Expulsão',
      'Má posicionamento identificado em USG',
      'Perfuração',
      'Outro',
    ];
  
  
  
    const [intercorrencias_selecionadas, set_intercorrencias_selecionadas] = React.useState<string[]>([info.intercorrenciasComunicadasPosInsercao]);
  
    const handle_intercorrencias = (event: SelectChangeEvent<typeof intercorrencias_selecionadas>) => {
      const {
        target: { value },
      } = event;
      set_intercorrencias_selecionadas(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };  


    const [feito_uso_de_usg, set_feito_uso_de_usg] = React.useState('');
    const [disable_resultado_usg, setDisableResultadoUsg] = React.useState(false);
  const handleFeitoUsoDeUsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_feito_uso_de_usg((event.target as HTMLInputElement).value);
    if((event.target as HTMLInputElement).value === 'no')
    {
      setDisableResultadoUsg(true);
      setResultadoUsgPosInsercaoPaciente('Nao realizado');
    }
    else
    {
      setDisableResultadoUsg(false);
      setResultadoUsgPosInsercaoPaciente('');
    }
  };
    
  
  const [open, setOpen] = React.useState(false);

  const updateInfofromForm = () => {
    // Use the spread operator to create a copy of the current dictionary
    const updatedInfo = { ...info };

    // Update or add a new key-value pair
    updatedInfo.dataAcompanhamento= data_acompanhamento_paciente.format('YYYY/MM/DD');
    updatedInfo.diasSangramentoPosInsercao= dias_sangramento_pos_insercao_paciente;
    updatedInfo.nivelSatisfacaoInsercao= nivel_de_satisfacao_paciente;
    updatedInfo.dataUltimaMenstruacaoPosInsercao= data_ultima_menstruacao_pos_insercao_paciente.format('YYYY/MM/DD');
    updatedInfo.diasMenstruadaPosInsercao= dias_mestruada_pos_insercao_paciente;
    updatedInfo.intervaloDiasUltimoCicloPosInsercao= intervalo_ciclos_mestruais_pos_insercao_paciente;
    updatedInfo.volumeMenstrualPosInsercao= volume_menstrual_pos_insercao_paciente;
    updatedInfo.colicasPosInsercao= colicas_pos_insercao_paciente;
    updatedInfo.tamanhoFioCmPosInsercao= tamanho_do_fio_pos_insercao_paciente;
    updatedInfo.resultadoUSG= resultado_usg_pos_insercao_paciente;
    updatedInfo.intercorrenciasComunicadasPosInsercao= intercorrencias_selecionadas.toString();
    updatedInfo.qualOutraIntercorrenciaPosInsercao= intercorrencias_alertadas_pos_insercao_paciente;

    setInfo(updatedInfo);

    
}


  return (
    <Box sx={{ display: 'flex', height: '100vh',  flexDirection: 'column', p: 2 }}>


            <Grid container spacing={2} padding={2}>
                
           
              <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={
                            (event)=>{

                            setDataAcompanhamentoPaciente(event)
                        
                        }
                            } value={dayjs(data_acompanhamento_paciente)}
                            
                            format="YYYY-MM-DD" label="Data de acompanhamento"/>
                    </LocalizationProvider>
                </Grid>


                <Grid item xs={12} sm={4}>
                        <TextField
                            label="Dias com sangramento pós inserção"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={dias_sangramento_pos_insercao_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '')&& event.target.value.length <= 2){setDiasSangramentoPosInsercaoPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>

           

                <Grid item xs={12} sm={4}>
                        <Typography>Nível de satisfação com a inserção</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <Rating
                                name="simple-controlled"
                                value={nivel_numerico}
                                max={5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                  setNivelNumerico(newValue);
                                  setNivelDeSatisfacaoPaciente(labels[newValue as number]);
                                }}
                                onChangeActive={(event, newHover) => {
                                  setHover(newHover);
                                }}
                              />
                        
                        <Typography>{nivel_numerico !== null && labels[hover !== -1 ? hover : nivel_numerico]}</Typography>
                        </Stack>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={
                            (event)=>{

                            setDataUltimaMenstruacaoPosInsercaoPaciente(event)
                        
                        }
                            } value={dayjs(data_ultima_menstruacao_pos_insercao_paciente)}
                            
                            format="YYYY/MM/DD" label="Data da última menstruação pós inserção"/>
                    </LocalizationProvider>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Quantidade de dias que fica menstruada pós inserção"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={dias_mestruada_pos_insercao_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 3){setDiasMestruadaPosInsercaoPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Intervalo em dias entre ciclos menstruais pós inserção"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={intervalo_ciclos_mestruais_pos_insercao_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 3){setIntervaloCiclosMestruaisPosInsercaoPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>


            <Grid item xs={12} sm={3}>
                        <InputLabel id="demo-simple-select-label">Volume menstrual pós inserção</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={volume_menstrual_pos_insercao_paciente}
                        label="Volume Menstrual"
                        onChange={(event)=>{setVolumeMenstrualPosInsercaoPaciente(event.target.value)}}
                        autoWidth
                        >
                    <MenuItem value={'Nada'}>Não menstrua</MenuItem>
                    <MenuItem value={'Pequeno'}>Pequeno</MenuItem>
                    <MenuItem value={'Medio'}>Médio</MenuItem>
                    <MenuItem value={'Grande'}>Grande</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
                        <InputLabel id="demo-simple-select-label">Cólicas pós inserção</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={colicas_pos_insercao_paciente}
                        label="Cólicas"
                        onChange={(event)=>{setColicasPosInsercaoPaciente(event.target.value)}}
                        autoWidth
                        >
                    <MenuItem value={'Ausentes'}>Ausentes</MenuItem>
                    <MenuItem value={'Fracas'}>Fracas</MenuItem>
                    <MenuItem value={'Moderadas'}>Moderadas</MenuItem>
                    <MenuItem value={'Intensas'}>Intensas</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Tamanho do fio (em cm)"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={tamanho_do_fio_pos_insercao_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 2){setTamanhoDoFioPosInsercaoPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>Foi feito o USG?</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={feito_uso_de_usg}
                              onChange={handleFeitoUsoDeUsg}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>
                            <TextField
                                disabled={disable_resultado_usg}
                                label="Resultado do USG?"
                                variant="outlined"
                                margin="normal"
                                name="nome"
                                value={resultado_usg_pos_insercao_paciente}
                                onChange={(event)=>{setResultadoUsgPosInsercaoPaciente(event.target.value)}}
                                fullWidth
                                />
                        </Stack>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                
                <FormControl sx={{ m: 1, width: 600 }}>   
                <InputLabel id="demo-multiple-name-label">Intercorrências após a inserção com necessidade de comunicação</InputLabel>
                        <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={intercorrencias_selecionadas}
                        onChange={handle_intercorrencias}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                        >
                        {intercorrencias.map((name) => (
                            <MenuItem
                            key={name}
                            value={name}
                            
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                        
                </FormControl>

                        <TextField
                            label="Outra intercorrência? Qual? Relate aqui."
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={intercorrencias_alertadas_pos_insercao_paciente}
                            onChange={(event)=>{setIntercoorrenciasAlertadasPosInsercaoPaciente(event.target.value)}}
                            fullWidth
                            />
             
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

export default PostDiuInsertionForm;

