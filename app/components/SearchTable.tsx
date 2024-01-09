'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Box, Grid, MenuItem, Select } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';

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

  

  const [filtroPosto, setFiltroPosto] = React.useState('');

  const handleFiltroPostoSelecionado = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroPosto((event.target as HTMLInputElement).value);
  };

  return (
    
      <Box sx={{display: 'flex', flexDirection: 'column', margin: '2%', marginTop: '12%'}}>
        <Box sx={{ height:'100%', width:'80%', flexDirection: 'column', display: 'flex', alignSelf:'center', alignItems: 'center' , justifyContent: 'center'}}> 
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '60%', alignContent: 'center' }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Procurar por posto"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
             <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filtroPosto}
                        label="Centro de saúde de referência"
                        onChange={handleFiltroPostoSelecionado}
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
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {console.log(filtroPosto)}}>
              <SearchIcon />
            </IconButton>
        
          </Paper>
        </Box>

        <Box sx={{flexDirection: 'column', display: 'flex', padding: '5%'}}>
            <DataGrid
              sx={{height: '100%', width: '100%'}}
              rows={rows}
              columns={columns}
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
    
      </Box>

  );
}


