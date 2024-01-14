'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PersonalDataForm from './PersonalDataForm';
import HistoricalDataForm from './HistoricalDataForm';
import PhysicalExamForm from './PhysicalExamForm';
import DiuRemovalForm from './DiuRemovalForm';
import DiuInsertionForm from './DiuInsertionForm';
import PostDiuInsertionForm from './PostDiuInsertionForm';

import Button from '@mui/material/Button'
import dayjs, { Dayjs } from 'dayjs';
import { defaultDictionary } from '../utils/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Backdrop, Grid, Paper, Typography } from '@mui/material';




export default function TabRegister() {
  const [value, setValue] = React.useState('1');
  const router = useRouter();

  const [continueRegistrationScreen, setContinueRegistrationScreen] = React.useState(false);

  //  TODO : Isso trocará quando for um caso de update
  // useState hook with default value
  const [myDictionary, setMyDictionary] = React.useState(defaultDictionary);
  
  // TODO : Criar um método para alterar se é criação ou update e trocar o valor da variável
  const isPatientCreation = true;



  const [triggerDictionaryUpdate, setTriggerDictionaryUpdate] = React.useState(false);
  
  const handleUpdateDictionary = (newDictionary: any) => {
    setMyDictionary(newDictionary);
    setTriggerDictionaryUpdate(true);
  }
  const createPatient = async () => {
    console.log("Comando realizado logo antes do POST")
    console.log(myDictionary);
    await axios.post('/api/patients', myDictionary); 
    router.push('/cadastroPaciente'); 
    console.log('Cadastro Realizado com sucesso')
    
    setContinueRegistrationScreen(true);     
  }

  const updatePatient = async () => {
    await axios.put('/api/patients', myDictionary); 
    router.push('/cadastroPaciente'); 
    console.log('Atualização Realizada com sucesso')
    setContinueRegistrationScreen(false);
  }

  React.useEffect(() => {
    if (triggerDictionaryUpdate) {
      // Perform the POST request or other logic with the updated state
      console.log('Updated Parent State:', myDictionary);
      // Make your POST request here
      if(isPatientCreation)
      {
        console.log('Entrou na condição de criação')
        console.log(isPatientCreation)
        createPatient();
      }
      else
      {
        console.log('Não sei porque caralhas não entrou')
        console.log(isPatientCreation)
      }
      // postRequest(parentState);

      // Reset triggerUpdate to false to avoid unnecessary calls
      setTriggerDictionaryUpdate(false);
    }
  }, [triggerDictionaryUpdate, myDictionary]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };



 
  const nextTab = (currentValue: string) => {
    const intValue = parseInt(currentValue)
    if (intValue > 5) {
      router.push('/buscaPaciente');
    }
    else
    {
      setValue((intValue + 1).toString());
    }
    setContinueRegistrationScreen(false);
  }

  

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Dados Pessoais" value="1" />
            <Tab label="Histórico" value="2" />
            <Tab label="Exame Físico" value="3" />
            <Tab label="Inserção do DIU" value="4" />
            <Tab label="Pós-Inserção do DIU" value="5" />
            <Tab label="Remoção do DIU" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1"><PersonalDataForm info={myDictionary} setInfo={handleUpdateDictionary}/> </TabPanel>
        <TabPanel value="2"> <HistoricalDataForm goBackFirstTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}/></TabPanel>
        <TabPanel value="3"><PhysicalExamForm currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}/> </TabPanel>
        <TabPanel value="4"><DiuInsertionForm currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}/> </TabPanel>
        <TabPanel value="5"><PostDiuInsertionForm  currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}/> </TabPanel>
        <TabPanel value="6"><DiuRemovalForm currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}/> </TabPanel>
      </TabContext>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={continueRegistrationScreen}
        
      >
      <Paper elevation={3}  sx={{display: 'flex', bgcolor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50%', width: '50%'}}>
                <Grid container spacing={2} padding={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' fontWeight={'bold'} sx={{margin:'20px'}}>Cadastro criado. Deseja continuar com dados desta paciente?</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant='contained' sx={{bgcolor: '#265D9B'}} size='large' onClick={()=>{nextTab(value)}}>Sim</Button>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <Button variant='contained' sx={{bgcolor: '#265D9B'}} size='large' onClick={() => {router.push('/buscaPaciente'); }}>Não</Button>
                    </Grid>
                </Grid>
            </Paper>
          
      </Backdrop>
    </Box>
  );
}