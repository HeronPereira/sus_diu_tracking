'use client'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Backdrop, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { FocusTrap } from '@mui/base/FocusTrap';

import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { defaultProfissional, messageStyles } from "./utils/utils";
import dayjs from "dayjs";
import AlertComponent from "./components/AlertComponent";
import axios from "axios";
import { comparePassword } from "./utils/crypto";
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);

    const [loginCpf, setLoginCpf] = React.useState('');
    const [loginSenha, setLoginSenha] = React.useState('');

    const [showAdminLog, setShowAdminLog] = React.useState(false);
    const [userAdmin, setUserAdmin] = React.useState('');
    const [passwordAdmin, setPasswordAdmin] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');
    const [alertType, setAlertType] = React.useState<messageStyles>('info');

    let newProfissional = defaultProfissional;

    const [cpfProfissional, setCpfProfissional] = React.useState('');
    const [senhaProfissional, setSenhaProfissional] = React.useState('');
    const [nomeProfissional, setNomeProfissional] = React.useState('');
    const [emailProfissional, setEmailProfissional] = React.useState('');
    const [nascimentoProfissional, setNascimentoProfissional] = React.useState(defaultProfissional['nascimento']);
    const [matriculaProfissional, setMatriculaProfissional] = React.useState('');
    const [corencrmProfissional, setCorencrmProfissional] = React.useState('');
    const [equipeVinculadaProfissional, setEquipeVinculadaProfissional] = React.useState('');
    const [centroSaudeVinculadoProfissional, setCentroSaudeVinculadoProfissional] = React.useState('');
    
    const handleLoginCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
        const onlyContainsNumbers = /^\d+$/.test(event.target.value); 
        if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 11)
        {
        setLoginCpf((event.target as HTMLInputElement).value);
        }
      };
      const handleLoginSenha = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginSenha((event.target as HTMLInputElement).value);
      };

    const handleNewProfissionalCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
        const onlyContainsNumbers = /^\d+$/.test(event.target.value); 
        if((onlyContainsNumbers || event.target.value === '') && event.target.value.length <= 11)
        {
        setCpfProfissional((event.target as HTMLInputElement).value);
        newProfissional.cpf = (event.target as HTMLInputElement).value;
        }
      };

    const handleNewProfissionalSenha = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSenhaProfissional((event.target as HTMLInputElement).value);
        newProfissional.senha = (event.target as HTMLInputElement).value;
      };
      const handleNewProfissionalNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomeProfissional((event.target as HTMLInputElement).value);
        newProfissional.nome = (event.target as HTMLInputElement).value;
      };
      const handleNewProfissionaleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailProfissional((event.target as HTMLInputElement).value);
        newProfissional.email = (event.target as HTMLInputElement).value;
      };
    
      const handleNewProfissionalMatricula = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatriculaProfissional((event.target as HTMLInputElement).value);
        newProfissional.cpf = (event.target as HTMLInputElement).value;
      };
      const handleNewProfissionalCorencrm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorencrmProfissional((event.target as HTMLInputElement).value);
        newProfissional.cpf = (event.target as HTMLInputElement).value;
      };
      const handleNewProfissionalEquipeVinculada = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEquipeVinculadaProfissional((event.target as HTMLInputElement).value);
        newProfissional.cpf = (event.target as HTMLInputElement).value;
      };
     
      const checkAllFieldsAreFine = () => {
        if ((/^\d+$/.test(newProfissional.cpf) == false) || (newProfissional.cpf.length != 11))
        {
            return false; 
        }
        else if (newProfissional.senha == '' || newProfissional.senha == undefined || newProfissional.senha == null)
        {
            return false;
        }
        else if (newProfissional.nome == '' || newProfissional.nome == undefined || newProfissional.nome == null)
        {
            return false;
        }
        else if (newProfissional.email == '' || newProfissional.email == undefined || newProfissional.email == null)
        {
            return false;
        }
        
        else if (newProfissional.nascimento == dayjs() || newProfissional.nascimento == undefined || newProfissional.nascimento == null)
        {
            return false;
        }
        
        else if (newProfissional.matricula == '' || newProfissional.matricula == undefined || newProfissional.matricula == null)
        {
            return false;
        }
        
        else if (newProfissional.corencrm == '' || newProfissional.corencrm == undefined || newProfissional.corencrm == null)
        {
            return false;
        }
        else if (newProfissional.equipeVinculada == '' || newProfissional.equipeVinculada == undefined || newProfissional.equipeVinculada == null)
        {
            return false;
        }
        else if (newProfissional.centroSaudeVinculado == '' || newProfissional.centroSaudeVinculado == undefined || newProfissional.centroSaudeVinculado == null)
        {
            return false;
        }
        else
        {
            return true;
        }
      }

      const clearFields = () =>{
        setCpfProfissional('');
        setSenhaProfissional('');
        setNomeProfissional('');
        setEmailProfissional('');
        setNascimentoProfissional(defaultProfissional['nascimento']);
        setMatriculaProfissional('');
        setCorencrmProfissional('');
        setEquipeVinculadaProfissional('');
        setCentroSaudeVinculadoProfissional('');
        setUserAdmin('');
        setPasswordAdmin('');
      }
      const createProfessional = async (professional: typeof newProfissional) =>{
          await axios.post('/api/profissional', professional);
          setOpen(false);
          setAlertType('success');
          setAlertMessage('Profissional cadastrado com sucesso.');
          setShowAlert(true);
          clearFields();

      }

      const adminLog =  (user:string, pass:string) =>{
        if (user != "")
        {
            if(pass != "")
            {
                checkAllowCadastro(user, pass);
            }
            else
            {
                setAlertType('error');
                setAlertMessage('Senha obrigatória.');
                setShowAlert(true);
            }
        }
        else
        {
                setAlertType('error');
                setAlertMessage('Usuário obrigatório.');
                setShowAlert(true);
        }
        setShowAdminLog(false);
      }

      const profissionalLog =  (cpf:string, pass:string) =>{

        if (cpf != "")
        {
            if(pass != "")
            {
                checkGrantAccess(cpf, pass);
            }
            else
            {
                setAlertType('error');
                setAlertMessage('Senha obrigatória.');
                setShowAlert(true);
            }
        }
        else
        {
                setAlertType('error');
                setAlertMessage('Usuário obrigatório.');
                setShowAlert(true);
        }
      }

      const checkAllowCadastro = async (user:string, pass:string) =>{
          
            try {
                const foundedAdmin = await axios.get('/api/admin/' + user);
                const isPasswordValid = await comparePassword(pass, foundedAdmin.data.senha);

                if (isPasswordValid)
                {
                    setOpen(true);
                    setAlertType('success');
                    setAlertMessage('Cadastro de usuário autorizado.');
                    
                }
                else
                {
                    setOpen(false);
                    setAlertType('error');
                    setAlertMessage('Cadastro de usuário não autorizado.');
                
                }
                
        
              } 
              catch (error) {
                    setOpen(false);
                    setAlertType('error');
                    setAlertMessage('Usuário admin não encontrado.');
                  
              }
              setShowAlert(true);
            clearFields();
            setShowAdminLog(false);
          }
        
          const checkGrantAccess = async (cpf:string, pass:string) =>{
          
            try {
                const foundedProfissional = await axios.get('/api/profissional/' + cpf);
                const isPasswordValid = await comparePassword(pass, foundedProfissional.data.senha);

                if (isPasswordValid)
                {
                    // habilita o login
                    router.push('/Dashboard');
                    
                }
                else
                {
                    // nega o login
                    setAlertType('error');
                    setAlertMessage('Usuário ou senha incorretos!');
                    setShowAlert(true);
                }
                
        
              } 
              catch (error) {
                setAlertType('error');
                setAlertMessage('Usuário ou senha incorretos!');
                setShowAlert(true);
                  
              }

          }
            
          
      
      const handleCadastroProfissional = () =>{
        newProfissional.cpf = cpfProfissional;
        newProfissional.senha = senhaProfissional;
        newProfissional.nome = nomeProfissional;
        newProfissional.email = emailProfissional;
        newProfissional.nascimento = dayjs(nascimentoProfissional);
        newProfissional.matricula = matriculaProfissional;
        newProfissional.corencrm = corencrmProfissional;
        newProfissional.equipeVinculada = equipeVinculadaProfissional;
        newProfissional.centroSaudeVinculado = centroSaudeVinculadoProfissional;
        
        if (checkAllFieldsAreFine())
        {
            createProfessional(newProfissional);
        }
        else
        {
            setAlertType('error');
            setAlertMessage('Preencha todos os campos corretamente.');
            setShowAlert(true);
        }
       
      }
  
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
                        value={loginCpf}
                        onChange={handleLoginCpf}
                    />
                </Grid>
                <Grid item xs={12} sm={12} sx={{padding: '12px'}}>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginSenha}
                        onChange={handleLoginSenha}
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
                    <Button component={'label'} variant="outlined" onClick={() => setShowAdminLog(true)} endIcon={<PersonAddAlt1Icon />}>Cadastrar profissional</Button>
                </Grid>
                <Grid item xs={12} sm={3} alignSelf={'flex-end'} sx={{padding: '12px', display: 'flex',  flexDirection: 'column'}}>
                    <Button component={'label'} variant="contained" onClick={()=>{profissionalLog(loginCpf, loginSenha)}} endIcon={<LoginIcon />} >Entrar</Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                {open && (
                        <FocusTrap disableEnforceFocus open>
{/* -------------------------------------------------Cadastrar Profissional---------------------------------------------------------------- */}
                        <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
                        <Grid container spacing={2} padding={2}>
                                <Grid item xs={12} sm={12}>
                                    <Typography fontWeight={'bold'}>Cadastro de profissional</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="CPF" variant="outlined" fullWidth value={cpfProfissional} onChange={handleNewProfissionalCPF}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Senha" variant="outlined" fullWidth value={senhaProfissional} onChange={handleNewProfissionalSenha}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Nome" variant="outlined" fullWidth value={nomeProfissional} onChange={handleNewProfissionalNome}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Email" variant="outlined" fullWidth value={emailProfissional} onChange={handleNewProfissionaleEmail}/>
                                </Grid>
                                
                                <Grid item xs={12} sm={4}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        
                                        <DatePicker onChange={
                                                            (event)=>{
                                                                if(event)
                                                                    setNascimentoProfissional(event);
                                                            }
                                                            }

                                                    value={dayjs(nascimentoProfissional)}
                                                     format="DD/MM/YYYY" label="Data de nascimento*"/>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField label="Matrícula" variant="outlined" fullWidth value={matriculaProfissional} onChange={handleNewProfissionalMatricula}/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField label="COREN/CRM" variant="outlined" fullWidth value={corencrmProfissional} onChange={handleNewProfissionalCorencrm}/>
                                </Grid>
                                
                                
                                <Grid item xs={12} sm={4}>
                                    <TextField label="Equipe Vinculada" variant="outlined" fullWidth value={equipeVinculadaProfissional} onChange={handleNewProfissionalEquipeVinculada}/>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                            
                                <InputLabel id="demo-simple-select-label">Centro de saúde de referência</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                
                                label="Centro de saúde de referência"
                                value={centroSaudeVinculadoProfissional}
                                
                                onChange={(event)=>{setCentroSaudeVinculadoProfissional(event.target.value as string); newProfissional.centroSaudeVinculado = event.target.value as string}} 
                                autoWidth
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
                        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button component={'label'} variant="contained" onClick={handleCadastroProfissional}>Cadastrar</Button>     
                        </Grid>
                                    
                        
                        
                        </Grid>
                        </Box>
{/* -------------------------------------------------Cadastrar Profissional---------------------------------------------------------------- */}
                        </FocusTrap>
                    )}
                </Grid>
                <AlertComponent message={alertMessage} messageType={alertType} isOpen={showAlert} setIsOpen={setShowAlert}/>
                <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showAdminLog}>
      <Paper elevation={3}  sx={{display: 'flex', bgcolor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50%', width: '50%'}}>
                
                <Grid container spacing={2} padding={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h6' fontWeight={'bold'} sx={{ margin: '20px', width: '100%', display: 'flex' , flexDirection: 'row'}}>Credenciais de Admin são necessarias:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Usuário"
                            variant="outlined"
                            fullWidth
                            value={userAdmin}
                            onChange={(event) => setUserAdmin(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Senha"
                            variant="outlined"
                            fullWidth
                            value={passwordAdmin}
                            onChange={(event) => setPasswordAdmin(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}  sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                        <Button variant='contained' sx={{bgcolor: '#265D9B'}} size='large' onClick={() => {adminLog(userAdmin, passwordAdmin)}}>Continuar</Button>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}  sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                        <Button variant='contained' sx={{bgcolor: '#265D9B'}} size='large' onClick={() => {setShowAdminLog(false)}}>Sair</Button>
                    </Grid>
                </Grid>
            </Paper>
          
      </Backdrop>
                
            </Grid>
         </Paper>
      </Box>
  )
}