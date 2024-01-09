'use client'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { FocusTrap } from '@mui/base/FocusTrap';

import Link from "next/link";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Login() {

    const [open, setOpen] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

  return (
      <Box sx={{ bgcolor: '#265D9B', display: 'flex', height: '100vh', width: '100vw', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Paper sx={{display: 'flex', height: '90%', width: '40%', alignSelf: 'center', flexDirection: 'column'}}>
            <Grid container spacing={2} padding={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" fontWeight={'bold'} sx={{padding: '12px'}}>Login</Typography>
                    <Typography variant="subtitle1" sx={{padding: '8px'}}> Acesso de profissional de saúde</Typography>
                </Grid>
                <Grid item xs={12} sm={12} sx={{padding: '12px'}}>
                    <TextField
                        label="Digite seu CPF"
                        variant="outlined"
                        name="cpf"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12} sx={{padding: '12px'}}>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                    </FormControl>
            
                </Grid>
                
                <Grid item xs={12} sm={9} sx={{padding: '12px'}}>
                    <Button component={'label'} variant="outlined" onClick={() => setOpen(true)} endIcon={<PersonAddAlt1Icon />}>Cadastrar profissional</Button>
                </Grid>
                <Grid item xs={12} sm={3} alignSelf={'flex-end'} sx={{padding: '12px', display: 'flex',  flexDirection: 'column'}}>
                    <Link href="/cadastroPaciente"><Button component={'label'} variant="contained" endIcon={<LoginIcon />} >Entrar</Button></Link>
                </Grid>
                <Grid item xs={12} sm={12}>
                {open && (
                        <FocusTrap disableEnforceFocus open>
                        <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
                        <Grid container spacing={2} padding={2}>
                                <Grid item xs={12} sm={12}>
                                    <Typography fontWeight={'bold'}>Cadastro de profissional</Typography>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <TextField label="Nome" variant="outlined" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Data de nascimento"/>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField label="CPF" variant="outlined" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField label="Matrícula" variant="outlined" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField label="COREN/CRM" variant="outlined" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <TextField label="Email" variant="outlined" fullWidth/>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                            
                                <InputLabel id="demo-simple-select-label">Centro de saúde de referência</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                
                                label="Centro de saúde de referência"
                                
                                autoWidth
                                >
                                    <MenuItem value={0}>Abraão</MenuItem>
                                    <MenuItem value={1}>Agronômica</MenuItem>
                                    <MenuItem value={2}>Alto Ribeirão</MenuItem>
                                    <MenuItem value={3}>Armação</MenuItem>
                                    <MenuItem value={4}>Balneário</MenuItem>
                                    <MenuItem value={5}>Barra da Lagoa</MenuItem>
                                    <MenuItem value={6}>Cachoeira do Bom Jesus</MenuItem>
                                    <MenuItem value={7}>Caieira da Barra do Sul</MenuItem>
                                    <MenuItem value={8}>Campeche</MenuItem>
                                    <MenuItem value={9}>Canasvieiras</MenuItem>
                                    <MenuItem value={10}>Canto da Lagoa</MenuItem>
                                    <MenuItem value={11}>Capivari</MenuItem>
                                    <MenuItem value={12}>Capoeiras</MenuItem>
                                    <MenuItem value={13}>Carianos</MenuItem>
                                    <MenuItem value={14}>Centro</MenuItem>
                                    <MenuItem value={15}>Coloninha</MenuItem>
                                    <MenuItem value={16}>Coqueiros</MenuItem>
                                    <MenuItem value={17}>Córrego Grande</MenuItem>
                                    <MenuItem value={18}>Costa da Lagoa</MenuItem>
                                    <MenuItem value={19}>Costeira do Pirajubaé</MenuItem>
                                    <MenuItem value={20}>Estreito</MenuItem>
                                    <MenuItem value={21}>Fazenda do Rio Tavares</MenuItem>
                                    <MenuItem value={22}>Ingleses</MenuItem>
                                    <MenuItem value={23}>Itacorubi</MenuItem>
                                    <MenuItem value={24}>Jardim Atlântico</MenuItem>
                                    <MenuItem value={25}>João Paulo</MenuItem>
                                    <MenuItem value={26}>Jurerê</MenuItem>
                                    <MenuItem value={27}>Lagoa da Conceição</MenuItem>
                                    <MenuItem value={28}>Monte Cristo</MenuItem>
                                    <MenuItem value={29}>Monte Serrat</MenuItem>
                                    <MenuItem value={30}>Morro das Pedras</MenuItem>
                                    <MenuItem value={31}>Novo Continente</MenuItem>
                                    <MenuItem value={32}>Pantanal</MenuItem>
                                    <MenuItem value={33}>Pântano do Sul</MenuItem>
                                    <MenuItem value={34}>Ponta das Canas</MenuItem>
                                    <MenuItem value={35}>Prainha</MenuItem>
                                    <MenuItem value={36}>Ratones</MenuItem>
                                    <MenuItem value={37}>Ribeirão da Ilha</MenuItem>
                                    <MenuItem value={38}>Rio Tavares</MenuItem>
                                    <MenuItem value={39}>Rio Vemelho</MenuItem>
                                    <MenuItem value={40}>Saco dos Limões</MenuItem>
                                    <MenuItem value={41}>Saco Grande</MenuItem>
                                    <MenuItem value={42}>Santinho</MenuItem>
                                    <MenuItem value={43}>Santo Antônio de Lisboa</MenuItem>
                                    <MenuItem value={44}>Sapé</MenuItem>
                                    <MenuItem value={45}>Tapera</MenuItem>
                                    <MenuItem value={46}>Trindade</MenuItem>
                                    <MenuItem value={47}>Vargem Grande</MenuItem>
                                    <MenuItem value={48}>Vargem Pequena</MenuItem>
                                    <MenuItem value={49}>Vila Aparecida</MenuItem>
                                    <MenuItem value={50}>Policlínica Centro</MenuItem>
                                    <MenuItem value={51}>Policlínica Rio Tavares</MenuItem>
                                    <MenuItem value={52}>Policlínica Continente</MenuItem>
                                    <MenuItem value={53}>Policlínica da Mulher e da Criança</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button component={'label'} variant="contained" onClick={() => setOpen(false)}>Cadastrar</Button>     
                        </Grid>
                                    
                        
                        </Grid>
                        </Box>
                        </FocusTrap>
                    )}
                </Grid>
            </Grid>
         </Paper>
      </Box>
  )
}