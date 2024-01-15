'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Backdrop, Box, Button, Grid, MenuItem, Select, ThemeProvider, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { defaultDictionary } from '../utils/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const columns: GridColDef[] = [
  
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Nome',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
  {
    field: 'NomeSocial',
    headerName: 'Nome Social',
    width: 150,
    editable: true,
  },
  {
    field: 'dataNascimento',
    headerName: 'Data de Nascimento',
    width: 150,
    editable: true,
  },
  {
    field: 'cns',
    headerName: 'CNS',
    width: 150,
    editable: true,
  },
  {
    field: 'cpf',
    headerName: 'CPF',
    width: 150,
    editable: true,
  },
  {
    field: 'racaCor',
    headerName: 'Raça / Cor',
    width: 150,
    editable: true,
  },
  {
    field: 'renda',
    headerName: 'Renda mensal',
    width: 150,
    editable: true,
  },
  {
    field: 'profissao',
    headerName: 'Profissão',
    width: 150,
    editable: true,
  },
  {
    field: 'telefone',
    headerName: 'Telefone',
    width: 150,
    editable: true,
  },
  {
    field: 'telefoneFamiliar',
    headerName: 'Telefone Familiar',
    width: 150,
    editable: true,
  },
  {
    field: 'endereco',
    headerName: 'Endereço',
    width: 150,
    editable: true,
  },
  {
    field: 'cep',
    headerName: 'CEP',
    width: 150,
    editable: true,
  },
  {
    field: 'bairro',
    headerName: 'Bairro',
    width: 150,
    editable: true,
  },
  {
    field: 'cidade',
    headerName: 'Cidade',
    width: 150,
    editable: true,
  },
  {
    field: 'equipeReferencia',
    headerName: 'Equipe Referência',
    width: 150,
    editable: true,
  },
  {
    field: 'centroSaudesReferencia',
    headerName: 'Centro de Saude Referencia',
    width: 150,
    editable: true,
  },
];


const rows = [
  { id: 1, nome: 'Sophia', nomeSocial: 'Silva', dataNascimento: '01/01/2000', cns:0, cpf:0, racaCor: 'Branca', renda:0, profissao: 'aaa', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Abraão' },
  { id: 2, nome: 'Alice', nomeSocial: 'Rocha', dataNascimento: '01/01/2001', cns:0, cpf:0, racaCor: 'Branca', renda:0, profissao: 'aaa', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Lagoa da Conceição' },
  { id: 3, nome: 'Julia', nomeSocial: 'Texeira', dataNascimento: '01/01/2002', cns:0, cpf:0, racaCor: 'Parda', renda:0, profissao: 'aaa', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Ingleses' },
  { id: 4, nome: 'Isabella', nomeSocial: 'Vieira', dataNascimento: '02/02/1990', cns:0, cpf:0, racaCor: 'Indigena', renda:0, profissao: 'sss', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Lagoa da Conceição' },
  { id: 5, nome: 'Manuela', nomeSocial: 'Nunes', dataNascimento: '02/02/1992', cns:0, cpf:0, racaCor: 'Preta', renda:0, profissao: 'sss', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Trindade' },
  { id: 6, nome: 'Laura', nomeSocial: 'Santos', dataNascimento: '02/02/1993', cns:0, cpf:0, racaCor: 'Preta', renda:0, profissao: 'ddd', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Trindade' },
  { id: 7, nome: 'Luiza', nomeSocial: 'Soares', dataNascimento: '02/02/1996', cns:0, cpf:0, racaCor: 'Amarela', renda:0, profissao: 'ddd', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Trindade' },
  { id: 8, nome: 'Valentina', nomeSocial: 'Almeida', dataNascimento: '02/02/1996', cns:0, cpf:0, racaCor: 'Amarela', renda:0, profissao: 'ffff', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Ingleses' },
  { id: 9, nome: 'Giovana', nomeSocial: 'Rocha', dataNascimento: '02/02/1993', cns:0, cpf:0, racaCor: 'Branca', renda:0, profissao: 'gggg', telefone:0, telefoneFamiliar:0, endereco: '', cep:0, bairro: '', cidade:'', equipeReferencia: '', centroSaudesReferencia: 'Lagoa da Conceição' },
];



export default function SearchTable() {

  const data_keys = Object.keys(defaultDictionary)
  const router = useRouter();

  
  let array_cols: GridColDef[] = [{ field: 'id', headerName: 'ID', width: 90 }];

  for (let key of data_keys)
  {
    array_cols.push({ field: key, headerName: key, width: 150, editable: true});
  }

  const testResult = () =>{
    console.log(array_cols);
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

  
  if(isLoading){
  
    return <div>Loading...</div>
  }

  return (
    
      <Box sx={{display: 'flex', flexDirection: 'column', margin: '2%', marginTop: '12%'}}>
        <Button onClick={testResult}>Test stuff</Button>


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
              checkboxSelection
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
            <Button variant="contained" color='error' onClick={() => {deleteCPF(selectedCpf)}}>Sim</Button>
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


