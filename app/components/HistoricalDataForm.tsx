'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';

import InputAdornment from '@mui/material/InputAdornment';
import { Alert, Backdrop, Box, Checkbox, Chip, Collapse, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Typography, styled } from '@mui/material';
import { bool, number, object } from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import { string } from 'zod';


  
function HistoricalDataForm ({goBackFirstTab, info, setInfo}:{goBackFirstTab: (inf: any) => void, info: any, setInfo: (inf: any) => void}) {

  // Use the spread operator to create a copy of the current dictionary
  const updatedInfo = { ...info };

  const [gestacoes_anteriores_paciente, setGestacoesAnterioresPaciente] = useState(info['gestacoesAnteriores']);
  const [partos_normais_anteriores_paciente, setPartosNormaisAnterioresPaciente] = useState(info['partosNormaisAnteriores']);
  const [partos_cesarianas_anteriores_paciente, setPartosCesarianasAnterioresPaciente] = useState(info['partosCesarianasAnteriores']);
  const [abortos_anteriores_paciente, setAbortosAnterioresPaciente] = useState(info['abortosAnteriores']);
  const [data_ultima_gestacao_paciente, setDataUltimaGestacaoPaciente] = useState(info['dataUltimaGestacao']);
  const [data_ultima_menstruacao_paciente, setDataUltimaMenstruacaoPaciente] =useState(info['dataUltimaMenstruacao']);
  const [quantidade_dias_menstruada_paciente, setQuantidadeDiasMenstruadaPaciente] = useState(info['diasMenstruada']);
  const [intervalo_entre_ciclos_menstruais_paciente, setIntervaloEntreCiclosMenstruaisPaciente] = useState(info['intervaloEntreCiclosMenstruais']);
  const [volume_menstrual_paciente, setVolumeMenstrualPaciente] = useState(info['volumeMenstrual']);
  const [colicas_paciente, setColicasPaciente] = useState(info['colicas']);
  
  const [data_ultimo_preventivo_paciente, setDataUltimoPreventivoPaciente] = useState(info['dataUltimoPreventivo']);
  const [problemas_saude_paciente, setProblemasSaudePaciente] = useState(info['problemasSaude']);
  const [medicacoes_em_uso_paciente, setMedicacoesEmUsoPaciente] = useState(info['medicacaoEmUso']);
  const [alergia_cobre_medicamento_paciente, setAlergiaCobreMedicamentoPaciente] = useState(info['alergiaCobreMedicamento']);

  
  const [qual_ist_paciente, setQualIstPaciente] = useState(info['possuiQualIst']);

  
  const [qual_cirurgia_paciente, setQualCirurgiaPaciente] = useState(info['fezQualCirurgiaPelvicaUterina']);
  
  const [qual_exame_alteracao_de_utero_paciente, setQualExameAlteracaoDeUteroPaciente] = useState(info['fezQualExameAlteracaoUtero']);

  const [exames_anteriores_paciente, setExamesAnterioresPaciente] = useState(info['examesAnteriores']);
  const [porque_inserir_diu_paciente, setPorqueInserirDiuPaciente] = useState(info['porqueInserirDIU']);

  const [quais_duvidas_sobre_insercao_diu_paciente, setQuaisDuvidasSobreInsercaoDiuPaciente] = useState(info['duvidasSobreInsercaoDIU']);


  

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const metodos_anticonceptivos = [
    'Anticoncepcional oral combinado',
    'Anticoncepcional oral de progestágeno',
    'Anticoncepcional injetável combinado',
    'Anticoncepcional injetável de progestágeno',
    'DIU de cobre',
    'DIU hormonal',
    'Implante subdérmico',
    'Preservativo masculino',
    'Preservativo feminino',
    'Anel vaginal',
    'Tabelinha',
    'Coito interrompido',
    'Nenhum',
    'Outro',
  ];

  const [metodos_anticonceptivos_anteriores, setMetodos_anticonceptivos_anteriores] = React.useState<string[]>([info['contraceptivosAnteriores']]);

  const handle_metodos_anticonceptivos_anteriores = (event: SelectChangeEvent<typeof metodos_anticonceptivos_anteriores>) => {
    const {
      target: { value },
    } = event;
    setMetodos_anticonceptivos_anteriores(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };  
  
  const [metodos_anticonceptivos_atuais, setMetodos_anticonceptivos_atuais] = React.useState<string[]>([info['contraceptivosAtuais']]);

  const handle_metodos_anticonceptivos_atuais = (event: SelectChangeEvent<typeof metodos_anticonceptivos_atuais>) => {
    const {
      target: { value },
    } = event;
    setMetodos_anticonceptivos_atuais(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };  
  
  
  const [preventivoAlterado, setPreventivoAlterado] = React.useState(info['ultimoPreventivoAlterado']);

  const [disable_data_preventivo, setDisableDataPreventivo] = useState(false);

  const handlePreventivoAlterado = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreventivoAlterado((event.target as HTMLInputElement).value);

    if((event.target as HTMLInputElement).value === 'noindication')
    {
      setDisableDataPreventivo(true);
    }
    else
    {
      setDisableDataPreventivo(false);
    }
  };


  const [ist_positivo_paciente, setIstPositivoPaciente] = React.useState('');
  const [disable_ist_description, setDisableIstDescription] = React.useState(false);

  const handleIstPositivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIstPositivoPaciente((event.target as HTMLInputElement).value);
    if((event.target as HTMLInputElement).value === 'no')
    {
      setDisableIstDescription(true);
      setQualIstPaciente('Sem IST');
    }
    else
    {
      setDisableIstDescription(false);
      setQualIstPaciente('');
    }
  };


  const [realizou_cirurgia_pelvica_uterina_paciente, setRealizouCirurgiaPelvicaUterinaPaciente] = React.useState('');
  const [disableQualCirurgiaPelvicaUterina, setDisableQualCirurgiaPelvicaUterina] = React.useState(false);

  const handleRealizouCirurgiaPelvicaUterina = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealizouCirurgiaPelvicaUterinaPaciente((event.target as HTMLInputElement).value);

    if ((event.target as HTMLInputElement).value === 'no')
    {
      setDisableQualCirurgiaPelvicaUterina(true);
      setQualCirurgiaPaciente('Sem Cirurgia');
    }
    else
    {
      setDisableQualCirurgiaPelvicaUterina(false);
      setQualCirurgiaPaciente('');
    }
  };


  const [exame_detectou_alteracao_utero, set_exame_detectou_alteracao_utero] = React.useState('');
  const [disable_qual_exame_alteracao_utero, set_disable_qual_exame_alteracao_utero] = React.useState(false);

  const handleExameDetectouAlteracaoUtero = (event: React.ChangeEvent<HTMLInputElement>) => {
    set_exame_detectou_alteracao_utero((event.target as HTMLInputElement).value);
    if((event.target as HTMLInputElement).value === 'no')
    {
      set_disable_qual_exame_alteracao_utero(true);
      setQualExameAlteracaoDeUteroPaciente('Sem Exame');
    }
    else
    {
      set_disable_qual_exame_alteracao_utero(false);
      setQualExameAlteracaoDeUteroPaciente('');
    }
  };



  const [existe_duvidas_sobre_insercao_diu, set_existe_duvidas_sobre_insercao_diu] = useState('');
  const [disable_quais_duvidas_sobre_insercao_diu, set_disable_quais_duvidas_sobre_insercao_diu] = useState(false);
  const handleExisteDuvidasSobreInsercaoDiu = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    set_existe_duvidas_sobre_insercao_diu((event.target as HTMLInputElement).value);

    if((event.target as HTMLInputElement).value === 'no')
    {
      set_disable_quais_duvidas_sobre_insercao_diu(true);
      setQuaisDuvidasSobreInsercaoDiuPaciente('Sem Duvidas');
    }
    else
    {
      set_disable_quais_duvidas_sobre_insercao_diu(false);
      setQuaisDuvidasSobreInsercaoDiuPaciente('');
    }
  };

  

  const [termo_consentimento_enviado, setTermoConsentimentoEnviado] = React.useState(info['possuiTermoConsentimento']);

  const handleTermoConsentimentoEnviado = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermoConsentimentoEnviado(event.target.checked);

  };



const [backdrop_show, setBackdropShow] = useState(false);
const [mustRegisterPersonalDataFirst, setMustRegisterPersonalDataFirst] = useState(false);

const checkAllFieldsAreFine = () => {

    if (gestacoes_anteriores_paciente == '' || gestacoes_anteriores_paciente == undefined || gestacoes_anteriores_paciente == null)
    {
        return false;
    }
    else if (partos_normais_anteriores_paciente == '' || partos_normais_anteriores_paciente == undefined || partos_normais_anteriores_paciente == null)
    {
        return false;
    }
    else if (partos_cesarianas_anteriores_paciente == '' || partos_cesarianas_anteriores_paciente == undefined || partos_cesarianas_anteriores_paciente == null)
    {
        return false;
    }
    else if (abortos_anteriores_paciente == '' || abortos_anteriores_paciente == undefined || abortos_anteriores_paciente == null)
    {
        return false;
    }
    
    else if (colicas_paciente == '' || colicas_paciente == undefined || colicas_paciente == null)
    {
        return false;
    }
  
    else if (qual_ist_paciente == '' || qual_ist_paciente == undefined || qual_ist_paciente == null)
    {
        return false;
    }
    else if (qual_cirurgia_paciente == '' || qual_cirurgia_paciente == undefined || qual_cirurgia_paciente == null)
    {
        return false;
    }
    else if (porque_inserir_diu_paciente == '' || porque_inserir_diu_paciente == undefined || porque_inserir_diu_paciente == null)
    {
        return false;
    }
    else if (quais_duvidas_sobre_insercao_diu_paciente == '' || quais_duvidas_sobre_insercao_diu_paciente == undefined || quais_duvidas_sobre_insercao_diu_paciente == null)
    {
        return false;
    }
    else if(termo_consentimento_enviado == false)
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
 
          updatedInfo['gestacoesAnteriores'] = gestacoes_anteriores_paciente;
          updatedInfo['partosNormaisAnteriores'] = partos_normais_anteriores_paciente;
          updatedInfo['partosCesarianasAnteriores'] = partos_cesarianas_anteriores_paciente;
          updatedInfo['abortosAnteriores'] = abortos_anteriores_paciente;
          updatedInfo['dataUltimaGestacao'] = data_ultima_gestacao_paciente.format('YYYY/MM/DD');
          updatedInfo['dataUltimaMenstruacao'] = data_ultima_menstruacao_paciente.format('YYYY/MM/DD');
          updatedInfo['diasMenstruada'] = quantidade_dias_menstruada_paciente;
          updatedInfo['intervaloEntreCiclosMenstruais'] = intervalo_entre_ciclos_menstruais_paciente;
          updatedInfo['volumeMenstrual'] = volume_menstrual_paciente;
          updatedInfo['colicas'] = colicas_paciente;
          updatedInfo['contraceptivosAnteriores'] = metodos_anticonceptivos_anteriores.toString();
          updatedInfo['contraceptivosAtuais'] = metodos_anticonceptivos_atuais.toString();
          updatedInfo['ultimoPreventivoAlterado'] = preventivoAlterado;
          updatedInfo['dataUltimoPreventivo'] = data_ultimo_preventivo_paciente.format('YYYY/MM/DD');
          updatedInfo['possuiQualIst'] = qual_ist_paciente;
          updatedInfo['fezQualCirurgiaPelvicaUterina'] = qual_cirurgia_paciente;
          updatedInfo['problemasSaude'] = problemas_saude_paciente;
          updatedInfo['medicacaoEmUso'] = medicacoes_em_uso_paciente;
          updatedInfo['alergiaCobreMedicamento'] = alergia_cobre_medicamento_paciente
          updatedInfo['fezQualExameAlteracaoUtero'] = qual_exame_alteracao_de_utero_paciente;
          updatedInfo['examesAnteriores'] = exames_anteriores_paciente;
          updatedInfo['porqueInserirDIU'] = porque_inserir_diu_paciente;
          updatedInfo['duvidasSobreInsercaoDIU'] = quais_duvidas_sobre_insercao_diu_paciente;
          updatedInfo['possuiTermoConsentimento'] = termo_consentimento_enviado;
      
      
          setInfo(updatedInfo);

            
        }
        else
        {
            setBackdropShow(true);
        }
        
    }


  return (
    <Box sx={{ display: 'flex', height: '100%',  flexDirection: 'column', p: 2 }}>
        
            <Grid container spacing={2} padding={2}>
                <Grid item xs={12} sm={3}>
                        <InputLabel id="demo-simple-select-label">Gestações anteriores*</InputLabel>
                        <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gestacoes_anteriores_paciente}
                        label="Gestações anteriores"
                        onChange={(event)=>{setGestacoesAnterioresPaciente(event.target.value)}}
                        autoWidth
                        >
                    <MenuItem value={'0'}>0</MenuItem>
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'Mais'}>mais que 5</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
                        <InputLabel id="demo-simple-select-label">Partos normais anteriores*</InputLabel>
                        <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={partos_normais_anteriores_paciente}
                        label="Partos normais anteriores"
                        onChange={(event)=>{setPartosNormaisAnterioresPaciente(event.target.value)}}
                        autoWidth
                        >


                    <MenuItem value={'0'}>0</MenuItem>
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'Mais'}>mais que 5</MenuItem>
                    </Select>
                </Grid>

                
                <Grid item xs={12} sm={3}>
                        <InputLabel id="demo-simple-select-label">Partos cesarianas anteriores*</InputLabel>
                        <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={partos_cesarianas_anteriores_paciente}
                        label="Partos cesarianas anteriores"
                        onChange={(event)=>{setPartosCesarianasAnterioresPaciente(event.target.value)}}
                        autoWidth
                        >
                    <MenuItem value={'0'}>0</MenuItem>
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'Mais'}>mais que 5</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
                        <InputLabel id="demo-simple-select-label">Abortos anteriores*</InputLabel>
                        <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={abortos_anteriores_paciente}
                        label="Abortos anteriores"
                        onChange={(event)=>{setAbortosAnterioresPaciente(event.target.value)}}
                        autoWidth
                        >
                    <MenuItem value={'0'}>0</MenuItem>
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'Mais'}>mais que 5</MenuItem>
                    </Select>
                </Grid>


                <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={
                            (event)=>{

                            setDataUltimaGestacaoPaciente(event)
                        
                        }
                            } value={data_ultima_gestacao_paciente}
                            
                            format="DD/MM/YYYY" label="Data da última gestação"/>
                    </LocalizationProvider>
                </Grid>

                
                <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={
                            (event)=>{

                            setDataUltimaMenstruacaoPaciente(event)
                        
                        }
                            } value={data_ultima_menstruacao_paciente}
                            
                            format="DD/MM/YYYY" label="Data da última menstruação"/>
                    </LocalizationProvider>
                </Grid>
            
                
                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Quantidade de dias que fica menstruada"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={quantidade_dias_menstruada_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 3){setQuantidadeDiasMenstruadaPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Intervalo em dias entre ciclos menstruais"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={intervalo_entre_ciclos_menstruais_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 3){setIntervaloEntreCiclosMenstruaisPaciente(event.target.value)}}}
                            fullWidth
                            />
                </Grid>
                

                <Grid item xs={12} sm={3}>
                        <InputLabel id="demo-simple-select-label">Volume menstrual</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={volume_menstrual_paciente}
                        label="Volume Menstrual"
                        onChange={(event)=>{setVolumeMenstrualPaciente(event.target.value)}}
                        autoWidth
                        >
                    <MenuItem value={'Nada'}>Não menstrua</MenuItem>
                    <MenuItem value={'Pequeno'}>Pequeno</MenuItem>
                    <MenuItem value={'Medio'}>Médio</MenuItem>
                    <MenuItem value={'Grande'}>Grande</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
                        <InputLabel id="demo-simple-select-label">Cólicas*</InputLabel>
                        <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={colicas_paciente}
                        label="Cólicas"
                        onChange={(event)=>{setColicasPaciente(event.target.value)}}
                        autoWidth
                        >
                    <MenuItem value={'Ausentes'}>Ausentes</MenuItem>
                    <MenuItem value={'Fracas'}>Fracas</MenuItem>
                    <MenuItem value={'Moderadas'}>Moderadas</MenuItem>
                    <MenuItem value={'Intensas'}>Intensas</MenuItem>
                    </Select>
                </Grid>
                
            
                <Grid item xs={12} sm={4}>
                    <FormControl sx={{ m: 1, width: 400 }}>    
                    <InputLabel id="demo-multiple-name-label">Métodos contraceptivos usados anteriormente</InputLabel>
                            <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={metodos_anticonceptivos_anteriores}
                            onChange={handle_metodos_anticonceptivos_anteriores}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                            
                            >
                            {metodos_anticonceptivos.map((name) => (
                                <MenuItem
                                key={name}
                                value={name}
                                
                                >
                                {name}
                                </MenuItem>
                            ))}
                            </Select>
                
                    </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                
            <FormControl sx={{ m: 1, width: 400 }}>   
            <InputLabel id="demo-multiple-name-label">Métodos contraceptivos usados atualmente</InputLabel>
                    <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={metodos_anticonceptivos_atuais}
                    onChange={handle_metodos_anticonceptivos_atuais}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                    {metodos_anticonceptivos.map((name) => (
                        <MenuItem
                        key={name}
                        value={name}
                        
                        >
                        {name}
                        </MenuItem>
                    ))}
                    </Select>
                    
                    </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={3}>
          
                    <FormLabel id="demo-controlled-radio-buttons-group">Resultado do último preventivo alterado?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={preventivoAlterado}
                      onChange={handlePreventivoAlterado}
                    >
                      <FormControlLabel value="noindication" control={<Radio />} label="Sem indicação" />
                      <FormControlLabel value="no" control={<Radio />} label="Não" />
                      <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                    </RadioGroup>
        
            </Grid>
                
            <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker disabled={disable_data_preventivo} onChange={
                            (event)=>{

                            setDataUltimoPreventivoPaciente(event)
                        
                        }
                            } value={data_ultimo_preventivo_paciente}
                            
                            format="DD/MM/YYYY" label="Data da última menstruação"/>
                    </LocalizationProvider>
                </Grid>


                

                <Grid item xs={12} sm={6}>
                  
                        <Typography>Você tem ou teve alguma infecção sexualmente transmissível?*</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={ist_positivo_paciente}
                            onChange={handleIstPositivo}
                          >
                            <FormControlLabel value="no" control={<Radio />} label="Não" />
                            <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                          </RadioGroup>
                            <TextField
                                disabled={disable_ist_description}
                                label="Qual(is)?"
                                variant="outlined"
                                margin="normal"
                                name="nome"
                                value={qual_ist_paciente}
                                onChange={(event)=>{setQualIstPaciente(event.target.value)}}
                                fullWidth
                                />
                        </Stack>
                </Grid>

            
                <Grid item xs={12} sm={3}>
                        <Typography>Você já fez alguma cirurgia pélvica/uterina?*</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={realizou_cirurgia_pelvica_uterina_paciente}
                            onChange={handleRealizouCirurgiaPelvicaUterina}
                            >
                              <FormControlLabel value="no" control={<Radio />} label="Não" />
                              <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                          </RadioGroup>
                            <TextField
                                label="Qual(is)?"
                                variant="outlined"
                                margin="normal"
                                name="nome"
                                disabled={disableQualCirurgiaPelvicaUterina}
                                value={qual_cirurgia_paciente}
                                onChange={(event)=>{setQualCirurgiaPaciente(event.target.value)}}
                                fullWidth
                                />
                        </Stack>
                </Grid>

                
                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Problemas de saúde"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={problemas_saude_paciente}
                            onChange={(event)=>{setProblemasSaudePaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Medicações em uso"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={medicacoes_em_uso_paciente}
                            onChange={(event)=>{setMedicacoesEmUsoPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                
                <Grid item xs={12} sm={3}>
                        <TextField
                            label="Alergias ao cobre ou algum medicamento (sem preencher caso não tenha)"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={alergia_cobre_medicamento_paciente}
                            onChange={(event)=>{setAlergiaCobreMedicamentoPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>
               
                <Grid item xs={12} sm={4}>
                        <Typography>Você já fez algum exame que evidenciou alguma alteração no útero?</Typography>
                            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                              <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={exame_detectou_alteracao_utero}
                              onChange={handleExameDetectouAlteracaoUtero}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>
                            <TextField
                                disabled={disable_qual_exame_alteracao_utero}
                                label="Qual(is)?"
                                variant="outlined"
                                margin="normal"
                                name="nome"
                                value={qual_exame_alteracao_de_utero_paciente}
                                onChange={
                                    (event)=>{setQualExameAlteracaoDeUteroPaciente(event.target.value)}
                                }
                                fullWidth
                                />
                        </Stack>
                </Grid>

                <Grid item xs={12} sm={8}>
                        <TextField
                            label="Demais Exames anteriores"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={exames_anteriores_paciente}
                            onChange={(event)=>{setExamesAnterioresPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <TextField
                            required={true}
                            label="Por quê você quer inserir o DIU?"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={porque_inserir_diu_paciente}
                            onChange={(event)=>{setPorqueInserirDiuPaciente(event.target.value)}}
                            fullWidth
                            />
                </Grid>

                <Grid item xs={12} sm={6}>
                        <Typography>Tem dúvidas sobre a inserção do DIU?*</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={existe_duvidas_sobre_insercao_diu}
                              onChange={handleExisteDuvidasSobreInsercaoDiu}
                              >
                                <FormControlLabel value="no" control={<Radio />} label="Não" />
                                <FormControlLabel value="yes" control={<Radio />} label="Sim" />
                            </RadioGroup>
                            <TextField
                                disabled={disable_quais_duvidas_sobre_insercao_diu}
                                label="Qual(is)?"
                                variant="outlined"
                                margin="normal"
                                name="nome"
                                value={quais_duvidas_sobre_insercao_diu_paciente}
                                onChange={(event)=>{setQuaisDuvidasSobreInsercaoDiuPaciente(event.target.value)}}
                                fullWidth
                                />
                        </Stack>
                </Grid>

                <Grid item xs={12} sm={12}>
                <InputLabel id="demo-simple-select-label">Assinou o Termo de Consentimento Livre e Esclarecido?*</InputLabel>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Checkbox
                            checked={termo_consentimento_enviado}
                            onChange={handleTermoConsentimentoEnviado}
                            inputProps={{ 'aria-label': 'controlled' }}
                            required={true}
                            />
                            <Typography>Sim</Typography>

                            <Button component="label" variant="contained" startIcon={<AttachFileIcon/>}>
      Anexar arquivo
      <VisuallyHiddenInput type="file" />
    </Button>
                    </Stack>
                    
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

export default HistoricalDataForm;


/*

Assinou o Termo de Consentimento Livre e Esclarecido? (Sim/Não) - (OBRIGATÓRIO SIM)
ANEXAR O TERMO ASSINADO NO SISTEMA
 */