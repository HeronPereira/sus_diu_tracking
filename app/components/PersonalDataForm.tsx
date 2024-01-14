'use client'
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';

import InputAdornment from '@mui/material/InputAdornment';
import { Alert, Backdrop, Box, Collapse, Grid, IconButton, InputLabel, Paper, Select, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function PersonalDataForm ({ info, setInfo}:{info: any, setInfo: (inf: any) => void}) {


// Use the spread operator to create a copy of the current dictionary
const updatedInfo = { ...info };

const [nome_paciente, setNomePaciente] = useState(info['nome']);
const [cpf_paciente, setCPFPaciente] = useState(info['cpf']);
const [cns_paciente, setCNSPaciente] = useState(info['cns']);
const [nascimento_paciente, setNascimentoPaciente] = useState(info['nascimento']);

const [cep_paciente, setCEPPaciente] = useState(info['cep']);
const [endereco_paciente, setEnderecoPaciente] = useState(info['endereco']);
const [numero_paciente, setNumeroPaciente] = useState(info['numero']);
const [complemento_paciente, setComplementoPaciente] = useState(info['complemento']);

const [bairro_paciente, setBairroPaciente] = useState(info['bairro']);
const [cidade_paciente, setCidadePaciente] = useState(info['cidade']);


const [telefone_paciente, setTelefonePaciente] = useState(info['telefone']);
const [telefoneFamiliar_paciente, setTelefoneFamiliarPaciente] = useState(info['telefoneFamiliar']);


const [racacor_paciente, setRacaCorPaciente] = useState(info['cor']);
const [estadocivil_paciente, setEstadoCivilPaciente] = useState(info['estadoCivil']);
const [escolaridade_paciente, setEscolaridadePaciente] = useState(info['escolaridade']);

const [rendamensal_paciente, setRendaMensalPaciente] = useState(info['renda']);
const [profissao_paciente, setProfissaoPaciente] = useState(info['profissao']);
const [equipereferencia_paciente, setEquipeReferenciaPaciente] = useState(info['equipeReferencia']);

const [centrodesaude_paciente, setCentroDeSaudePaciente] = useState(info['centroSaudeReferencia']);


const [backdrop_show, setBackdropShow] = useState(false);


const checkAllFieldsAreFine = () => {
    if (nome_paciente == '' || nome_paciente == undefined || nome_paciente == null)
    {
        return false;
    }
    else if ((/^\d+$/.test(cpf_paciente) == false) || (cpf_paciente.length != 11))
    {
        return false; 
    }
    else if ((/^\d+$/.test(cns_paciente) == false) || (cns_paciente.length != 15))
    {
        return false; 
    }
    else if ((/^\d+$/.test(cep_paciente) == false) || (cep_paciente.length != 8))
    {
        return false; 
    }
    else if (endereco_paciente == '' || endereco_paciente == undefined || endereco_paciente == null)
    {
        return false;
    }
    else if ((/^\d+$/.test(numero_paciente) == false))
    {
        return false; 
    }
    else if (complemento_paciente == '' || complemento_paciente == undefined || complemento_paciente == null)
    {
        return false;
    }
    else if (bairro_paciente == '' || bairro_paciente == undefined || bairro_paciente == null)
    {
        return false;
    }
    else if (cidade_paciente == '' || cidade_paciente == undefined || cidade_paciente == null)
    {
        return false;
    }
    else if ((/^\d+$/.test(telefone_paciente) == false))
    {
        return false; 
    }
    else if ((/^\d+$/.test(telefoneFamiliar_paciente) == false))
    {
        return false; 
    }
    else if (racacor_paciente == '' || racacor_paciente == undefined || racacor_paciente == null)
    {
        return false;
    }
    else if (profissao_paciente == '' || profissao_paciente == undefined || profissao_paciente == null)
    {
        return false;
    }
    else if (estadocivil_paciente == '' || estadocivil_paciente == undefined || estadocivil_paciente == null)
    {
        return false;
    }
    else if (escolaridade_paciente == '' || escolaridade_paciente == undefined || escolaridade_paciente == null)
    {
        return false;
    }
    else if (equipereferencia_paciente == '' || equipereferencia_paciente == undefined || equipereferencia_paciente == null)
    {
        return false;
    }
    else if (centrodesaude_paciente == '' || centrodesaude_paciente == undefined || centrodesaude_paciente == null)
    {
        return false;
    }
    else if ((/^\d+$/.test(rendamensal_paciente) == false))
    {
        return false; 
    }
    else
    {
        return true;
    }
}


const handleSend = () => {
        
        if(checkAllFieldsAreFine())
        {
 
                // Update or add a new key-value pair
                updatedInfo['nome'] = nome_paciente;
                updatedInfo['cpf'] = cpf_paciente;
                updatedInfo['cns'] = cns_paciente;
                updatedInfo['nascimento'] = nascimento_paciente;
                updatedInfo['cep'] = cep_paciente;
                updatedInfo['endereco'] = endereco_paciente;
                updatedInfo['numero'] = numero_paciente;
                updatedInfo['complemento'] = complemento_paciente;
                updatedInfo['bairro'] = bairro_paciente;
                updatedInfo['cidade'] = cidade_paciente;
                updatedInfo['telefone'] = telefone_paciente;
                updatedInfo['telefoneFamiliar'] = telefoneFamiliar_paciente;
                updatedInfo['cor'] = racacor_paciente;
                updatedInfo['estadoCivil'] = estadocivil_paciente;
                updatedInfo['escolaridade'] = escolaridade_paciente;
                updatedInfo['renda'] = rendamensal_paciente;
                updatedInfo['profissao'] = profissao_paciente;
                updatedInfo['equipeReferencia'] = equipereferencia_paciente;
                updatedInfo['centroSaudeReferencia'] = centrodesaude_paciente;

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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required={true}
                            label="Nome / Nome Social"
                            variant="outlined"
                            margin="normal"
                            name="nome"
                            value={nome_paciente}
                            onChange={(event)=>{ setNomePaciente(event.target.value)}}
                            fullWidth
                            />
                    </Grid>
                                
           
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required={true}
                            label="CPF"
                            variant="outlined"
                            margin="normal"
                            name="cpf"
                            value={cpf_paciente}
                            onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 11){setCPFPaciente(event.target.value)}}}
                            fullWidth
                        />
                    </Grid>

                

            <Grid item xs={12} sm={4}>
                <TextField
                    required={true}
                    label="CNS"
                    variant="outlined"
                    margin="normal"
                    name="cns"
                    value={cns_paciente}
                    onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 15){setCNSPaciente(event.target.value)}}}
                    fullWidth
                />
            </Grid>


            <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker onChange={
                            (event)=>{
                            setNascimentoPaciente(event);
                            }
                            }
                            value={nascimento_paciente}
                            
                            format="DD/MM/YYYY" label="Data de nascimento*"/>
                    </LocalizationProvider>
                </Grid>

            <Grid item xs={12} sm={8}>
                <TextField
                    required={true}
                    label="CEP"
                    variant="outlined"
                    margin="normal"
                    name="cep"
                    value={cep_paciente}
                    onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 8){setCEPPaciente(event.target.value)}}}
                    fullWidth
                    
                />
            </Grid>

            <Grid item xs={12} sm={10}>    
                <TextField
                    required={true}
                    label="Endereço"
                    variant="outlined"
                    margin="normal"
                    name="endereco"
                    value={endereco_paciente}
                    onChange={(event)=>{setEnderecoPaciente(event.target.value)}}
                    fullWidth
                    
                />
            </Grid>

            <Grid item xs={12} sm={2}>
                <TextField
                    required={true}
                    label="Número"
                    variant="outlined"
                    margin="normal"
                    name="numero"
                    value={numero_paciente}
                    onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '')){setNumeroPaciente(event.target.value)}}}
                    fullWidth
                    
                />
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField
                    required={true}
                    label="Complemento"
                    variant="outlined"
                    margin="normal"
                    name="complemento"
                    value={complemento_paciente}
                    onChange={(event)=>{setComplementoPaciente(event.target.value)}}
                    fullWidth
                    
                />
            </Grid>

                        
            <Grid item xs={12} sm={6}>
                <TextField
                    required={true}
                    label="Bairro"
                    variant="outlined"
                    margin="normal"
                    name="bairro"
                    value={bairro_paciente}
                    onChange={(event)=>{setBairroPaciente(event.target.value)}}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    required={true}
                    label="Cidade"
                    variant="outlined"
                    margin="normal"
                    name="cidade"
                    value={cidade_paciente}
                    onChange={(event)=>{setCidadePaciente(event.target.value)}}
                    fullWidth
                    
                />
            </Grid>

            <Grid item xs={12} sm={4}>    
                <TextField
                    required={true}
                    label="Telefone"
                    variant="outlined"
                    margin="normal"
                    name="telefone"
                    value={telefone_paciente}
                    onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 14){setTelefonePaciente(event.target.value)}}}
                    fullWidth
                    
                />
            </Grid>

            <Grid item xs={12} sm={4}>    
                <TextField
                    required={true}
                    label="Telefone Familiar"
                    variant="outlined"
                    margin="normal"
                    name="telefonefamiliar"
                    value={telefoneFamiliar_paciente}
                    onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 14){setTelefoneFamiliarPaciente(event.target.value)}}}
                    
                    fullWidth
                    
                />
            </Grid>

            
            <Grid item xs={12} sm={2}>
            <InputLabel id="demo-simple-select-label">Raça/Cor (auto declarado)*</InputLabel>
                        <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={racacor_paciente}
                        label="Raca/Cor"
                        onChange={(event)=>{setRacaCorPaciente(event.target.value as string)}}
                        autoWidth
                        >
                    <MenuItem value={'BRANCA'}>BRANCA</MenuItem>
                    <MenuItem value={'PRETA'}>PRETA</MenuItem>
                    <MenuItem value={'AMARELO'}>AMARELO</MenuItem>
                    <MenuItem value={'PARDA'}>PARDA</MenuItem>
                    <MenuItem value={'INDÍGENA'}>INDÍGENA</MenuItem>
                    </Select>

            </Grid>

            <Grid item xs={12} sm={2}>
            <InputLabel id="estado-civil-label">Estado Civil*</InputLabel>
                        <Select
                        required={true}
                        labelId="estado-civil-label"
                        id="estado-civil"
                        value={estadocivil_paciente}
                        label="Estado Civil"
                        onChange={(event)=>{setEstadoCivilPaciente(event.target.value as string)}}
                        autoWidth
                        >
                    <MenuItem value={'Solteira'}>Solteira</MenuItem>
                    <MenuItem value={'Casada'}>Casada</MenuItem>
                    <MenuItem value={'Separada'}>Separada</MenuItem>
                    <MenuItem value={'Divorciada'}>Divorciada</MenuItem>
                    <MenuItem value={'Viúva'}>Viúva</MenuItem>
                    </Select>

            </Grid>

            <Grid item xs={12} sm={3}>
            <InputLabel id="escolaridade-label">Escolaridade*</InputLabel>
                        <Select
                        required={true}
                        labelId="escolaridade-label"
                        id="escolaridade"
                        value={escolaridade_paciente}
                        label="Escolaridade"
                        onChange={(event)=>{setEscolaridadePaciente(event.target.value)}}
                        fullWidth
                        >
                            <MenuItem value={'Analfabeta'}>Analfabeta</MenuItem> 
                            <MenuItem value={'Fundamental - Incompleto'}>Fundamental - Incompleto</MenuItem>
                            <MenuItem value={'Fundamental - Completo'}>Fundamental - Completo</MenuItem>
                            <MenuItem value={'Médio - Incompleto'}>Médio - Incompleto</MenuItem>
                            <MenuItem value={'Médio - Completo'}>Médio - Completo</MenuItem>
                            <MenuItem value={'Superior - Incompleto'}>Superior - Incompleto</MenuItem>
                            <MenuItem value={'Superior - Completo'}>Superior - Completo</MenuItem>
                            <MenuItem value={'Pós-graduação - Incompleto'}>Pós-graduação - Incompleto</MenuItem>
                            <MenuItem value={'Pós-graduação - Completo'}>Pós-graduação - Completo</MenuItem>
         
                    </Select>

            </Grid>
                
           
            <Grid item xs={12} sm={4}>
                <TextField
                    required={true}
                    label="Renda Mensal"
                    variant="outlined"
                    margin="normal"
                    name="rendamensal"
                    value={rendamensal_paciente}
                    onChange={(event)=>{const onlyContainsNumbers = /^\d+$/.test(event.target.value); if((onlyContainsNumbers || event.target.value === '')){setRendaMensalPaciente(event.target.value)}}}
                    fullWidth
                    
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={6}>    
                <TextField
                    required={true}
                    label="Profissão"
                    variant="outlined"
                    margin="normal"
                    name="profissao"
                    value={profissao_paciente}
                    onChange={(event)=>{setProfissaoPaciente(event.target.value)}}
                    fullWidth
                    
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required={true}
                    label="Equipe de referência"
                    variant="outlined"
                    margin="normal"
                    value={equipereferencia_paciente}
                    onChange={(event)=>{setEquipeReferenciaPaciente(event.target.value)}}
                    fullWidth
                />
            </Grid>

                <Grid item xs={12} sm={6}>
                        <InputLabel id="demo-simple-select-label">Centro de saúde de referência*</InputLabel>
                        <Select
                        required={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={centrodesaude_paciente}
                        label="Centro de saúde de referência"
                        onChange={(event)=>{setCentroDeSaudePaciente(event.target.value)}}
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
    </Box>
  );
};

export default PersonalDataForm;
 