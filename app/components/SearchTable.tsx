'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Backdrop, Box, Button, Grid, MenuItem, Select, ThemeProvider, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { defaultDictionary, deleteFile } from '../utils/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import FileDownload from '../components/FileDownload'


export default function SearchTable() {

  const data_keys = Object.keys(defaultDictionary)
  const router = useRouter();

  
  let array_cols: GridColDef[] = [{ field: 'id', headerName: 'ID', width: 90 }];

  for (let key of data_keys)
  {
    array_cols.push({ field: key, headerName: key, width: 150, editable: false});
  }

  const findTermGivenCpf  = (cpf: string) =>{
    const file = databaseRows.find((row) => row.cpf === cpf);
    if (file === undefined) {
      return " bundinha ";;
    }
    return file?.possuiTermoConsentimento;  
  }

 
  const [databaseRows, setDatabaseRows] = React.useState<typeof defaultDictionary[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getDatabase = async () => {
    
    try {
      const database = await axios.get('/api/patients/');
      setDatabaseRows(database.data);
      setIsLoading(false);

    } 
    catch (error) {
      console.error(error);
      console.log('Not possible to GET database');
      setIsLoading(false);
    }
  }
  React.useEffect(() => {
    getDatabase();
  }, []);

  
  const [selectedCpf, setSelectedCpf] = React.useState('');
  const [confirmaExclusao, setConfirmaExclusao] = React.useState(false);

  const deleteCPF = async (deleteThisCpf: string) => {
    try{
      await axios.delete('/api/patients/' + deleteThisCpf);
      
      setConfirmaExclusao(false);
      console.log('Deleted')
      router.push('/buscaPaciente');
      router.refresh();
      setIsLoading(true);
      setSelectedCpf('');
      getDatabase();
    }
    catch(error){
      console.error(error);
      setConfirmaExclusao(false)
      console.log('Not possible to DELETE patient');
    }
  }

  const handleDeleteTermAndCpf = async() => {
    try{
        if (selectedCpf)
        {
          await deleteFile(findTermGivenCpf(selectedCpf).toString()); 

          await deleteCPF(selectedCpf);
  
          console.log('Deleted');

        }
    }
    catch(error){
      console.error(error);
    }

    
  }
  const tempData = defaultDictionary;

  tempData['cpf'] = '01234567890';
  tempData['possuiTermoConsentimento'] = 'e36ea9a4-e1dd-4c87-907e-9c26d8f17552';


  if(isLoading){  
    return <div>Loading...</div>
  }

 
  return (
    
      <Box sx={{display: 'flex', flexDirection: 'column', margin: '2%', marginTop: '12%'}}>

        <Box sx={{flexDirection: 'column', display: 'flex', padding: '5%'}}>
            <DataGrid
              sx={{height: '100%', width: '100%'}}
              rows={databaseRows}
              columns={array_cols}
              onRowClick={params => {setSelectedCpf(params.row.cpf)}}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
            
              disableRowSelectionOnClick
              slots={{toolbar: GridToolbar}}
            />
        </Box>
        <Grid container spacing={2} padding={2} sx={{ width: '100%', display: 'flex' , flexDirection: 'row'}}>
          
          <Grid item xs={12} sm={12} sx={{justifyContent: 'center', alignItems: 'center', display: 'flex' , flexDirection: 'column'}}>
            <Typography variant="h5" fontWeight="bold">CPF Selecionado: {selectedCpf}</Typography>
            <Typography variant="body1" sx={{margin: '8px'}}>O que deseja fazer? Clique em um registro da tabela para selecionar.</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
            <Button variant="contained" color='secondary' onClick={() => {(selectedCpf !== '') ? router.push('/cadastroPaciente/' + selectedCpf) : console.warn('Selecione um item primeiro')}}>Editar</Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
            <Button variant="contained" color="error"  onClick={() => {(selectedCpf !== '') ? setConfirmaExclusao(true) : console.warn('Selecione um item primeiro')}}>Excluir</Button>  
          </Grid>
          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
           <FileDownload fileId={(findTermGivenCpf(selectedCpf) as string)} buttonText='Baixar termo de consentimento'/>
          </Grid>
        </Grid>
          
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={confirmaExclusao}
        
      >
      <Paper elevation={3}  sx={{display: 'flex', bgcolor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50%', width: '50%'}}>
      <Grid container spacing={2} padding={2} sx={{ width: '100%', display: 'flex' , flexDirection: 'row'}}>
          
          <Grid item xs={12} sm={12} sx={{justifyContent: 'center', alignItems: 'center', display: 'flex' , flexDirection: 'column'}}>
            <Typography variant="h5" fontWeight="bold">Tem certeza que deseja excluir: {selectedCpf}?</Typography>
            <Typography variant="body1" sx={{margin: '8px'}}>Uma vez excluído não será possível recuperar este registro.</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
            <Button variant="contained" color='error' onClick={() => {handleDeleteTermAndCpf()}}>Sim</Button>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
            <Button variant="outlined" color="primary"  onClick={() => {setConfirmaExclusao(false)}}>Não</Button>
       
          </Grid>
        </Grid>    
      </Paper>
          
      </Backdrop>
    
      </Box>

  );
}