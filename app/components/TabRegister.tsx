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




export default function TabRegister() {
  const [value, setValue] = React.useState('1');
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // useState hook with default value
  const [myDictionary, setMyDictionary] = React.useState(defaultDictionary);


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
        <TabPanel value="1"><PersonalDataForm currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={setMyDictionary}/> </TabPanel>
        <TabPanel value="2"> <HistoricalDataForm currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={setMyDictionary}/></TabPanel>
        <TabPanel value="3"><PhysicalExamForm currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={setMyDictionary}/> </TabPanel>
        <TabPanel value="4"><DiuInsertionForm currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={setMyDictionary}/> </TabPanel>
        <TabPanel value="5"><PostDiuInsertionForm  currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={setMyDictionary}/> </TabPanel>
        <TabPanel value="6"><DiuRemovalForm currentTab={value} setCurrentTab={setValue}  info={myDictionary} setInfo={setMyDictionary}/> </TabPanel>
      </TabContext>
      <Button variant='contained' sx={{bgcolor: '#265D9B'}} onClick={async () => { await axios.post('/api/patients', myDictionary); router.push('/'); console.log('Cadastro Realizado com sucesso') }}>Cadastrar</Button>
    </Box>
  );
}