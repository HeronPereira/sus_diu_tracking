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
import { defaultDictionary } from '../utils/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Backdrop, Grid, Paper, Typography } from '@mui/material';




export default function TabRegister({lookForCpf}:{lookForCpf:string}) {
  
  const [value, setValue] = React.useState('1');
  const router = useRouter();

  const [continueRegistrationScreen, setContinueRegistrationScreen] = React.useState(false);

  //  TODO : Isso trocará quando for um caso de update
  // useState hook with default value
  
  const [myDictionary, setMyDictionary] = React.useState(defaultDictionary);
  
  const [isLoading, setIsLoading] = React.useState(true);

  const [triggerDictionaryUpdate, setTriggerDictionaryUpdate] = React.useState(false);
  
  const [allowRequestDatabase, setAllowRequestDatabase] = React.useState(false);

  const handleUpdateDictionary = (newDictionary: any) => {
    setMyDictionary(newDictionary);
    setTriggerDictionaryUpdate(true);
  }
  const createPatient = async () => {
    console.log("Comando realizado logo antes do POST", myDictionary)
    await axios.post('/api/patients', myDictionary); 

    setContinueRegistrationScreen(true);     
  }

  const updatePatient = async (cpfSearched: string) => {
    console.log("Comando realizado logo antes do PATCH", myDictionary)
    await axios.patch('/api/patients/' + cpfSearched, myDictionary); 

    
    setContinueRegistrationScreen(true);    
  }

  

  React.useEffect(() => {
    const filledDictionary = async (cpfSearched: string) => {
    
      try {
        const newDictionary = await axios.get('/api/patients/' + cpfSearched);
        handleUpdateDictionary(newDictionary['data']);
        
       setIsLoading(false);

      } 
      catch (error) {
        console.error(error);
        console.log('Not possible to GET patient');
        handleUpdateDictionary(defaultDictionary);
        setIsLoading(false);
      }
    }

    filledDictionary(lookForCpf);
  }, []);

  React.useEffect(() => {
    
    // console.log('Updated Parent State:', myDictionary);
    if (allowRequestDatabase) {
      // Perform the POST request or other logic with the updated state
      if (lookForCpf == '')
      {
        console.log('Create Request called:', myDictionary);
        createPatient();
      }
      else
      {
        console.log('Update Request called:', myDictionary);
        updatePatient(lookForCpf);
      }
      setAllowRequestDatabase(false);
    }
    if (triggerDictionaryUpdate) {
      // Perform the POST request or other logic with the updated state
     console.log('dictionary latest state:', myDictionary);

      // Reset triggerUpdate to false to avoid unnecessary calls
      setTriggerDictionaryUpdate(false);
    }
  }, [allowRequestDatabase, myDictionary, triggerDictionaryUpdate]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };



 
  

  if (isLoading) {
    return <div>Loading...</div>;
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
        <TabPanel value="1"><PersonalDataForm info={myDictionary} setInfo={handleUpdateDictionary} setReady={setAllowRequestDatabase}/> </TabPanel>
        <TabPanel value="2"> <HistoricalDataForm goBackFirstTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}  setReady={setAllowRequestDatabase}/></TabPanel>
        <TabPanel value="3"><PhysicalExamForm goBackFirstTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary} setReady={setAllowRequestDatabase}/> </TabPanel>
        <TabPanel value="4"><DiuInsertionForm  goBackFirstTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}  setReady={setAllowRequestDatabase}/> </TabPanel>
        <TabPanel value="5"><PostDiuInsertionForm   goBackFirstTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}  setReady={setAllowRequestDatabase}/> </TabPanel>
        <TabPanel value="6"><DiuRemovalForm  goBackFirstTab={setValue}  info={myDictionary} setInfo={handleUpdateDictionary}  setReady={setAllowRequestDatabase}/> </TabPanel>
      </TabContext>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={continueRegistrationScreen}
        
      >
      <Paper elevation={3}  sx={{display: 'flex', bgcolor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50%', width: '50%'}}>
                
                <Grid container spacing={2} padding={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='h5' fontWeight={'bold'} sx={{ margin: '20px', width: '100%', display: 'flex' , flexDirection: 'row'}}>Registrado com sucesso</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}  sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                        <Button variant='contained' sx={{bgcolor: '#265D9B'}} size='large' onClick={()=>{router.push('/cadastroPaciente/' + myDictionary.cpf);}}>Continuar</Button>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}  sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                        <Button variant='outlined' sx={{bgcolor: '#265D9B'}} size='large' onClick={() => {router.push('/buscaPaciente'); }}>Sair</Button>
                    </Grid>
                </Grid>
            </Paper>
          
      </Backdrop>
    </Box>
  );
}