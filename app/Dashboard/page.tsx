"use client"
import Image from 'next/image'

import Navbar from '../components/Navbar'
import { Box, Grid, Typography } from '@mui/material'
import SearchTable from '../components/SearchTable'
import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [{ type: "date", label: "Day" }, "Quantidade de registros"],
  [new Date(2014, 0), 1],
  [new Date(2014, 1), 2],
  [new Date(2014, 2), 0],
  [new Date(2014, 3), 3],
  [new Date(2014, 4),0],
  [new Date(2014, 5), 5],
  [new Date(2014, 6), 0],
  [new Date(2014, 7), 11],
  [new Date(2014, 8), 2],
  [new Date(2014, 9), 0],
  [new Date(2014, 10), 0],
  [new Date(2014, 11), 1],
];

export const options = {
  chart: {
    title: "Registros de acordo com o tempo",
  },
  series: {
    // Gives each series an axis name that matches the Y-axis below.
    0: { axis: "Temps" },
    1: { axis: "Daylight" },
  },
  axes: {
    // Adds labels to each axis; they don't have to match the axis names.
    y: {
      Temps: { label: "Temps (Celsius)" },
      Daylight: { label: "Daylight" },
    },
  },
};


export const data2 = [
  ["Modelo", "Quantidade aplicada"],
  ["Prata", 2],
  ["Mirena", 2],
  ["Cobre", 11],
  ["Kyleena", 2],
];

export const options2 = {
  title: "Modelos de DIU mais procurados",
  pieHole: 0.4,
  is3D: false,
};


export const dataEscolaridade = [
  ['Escolaridade', 'Quantidade'],
  ['Analfabeta', 0],
  ['Fundamental - Incompleto', 0],
  ['Fundamental - Completo', 1],
  ['Médio - Incompleto', 1],
  ['Médio - Completo', 3],
  ['Superior - Incompleto', 5],
  ['Superior - Completo', 10],
  ['Pós-graduação - Incompleto', 1],
  ['Pós-graduação - Completo', 1]
]

export const dataRaca = [
  ['Raca', 'Quantidade'],
  ['BRANCA', 5],
  ['PRETA', 5],
  ['AMARELO', 3],
  ['PARDA', 1],
  ['INDÍGENA', 0]
]

export const dataEstadoCivil = [
  ['Estado Civil', 'Quantidade'],
  ['Solteira', 5],
  ['Casada', 3],
  ['Separada', 1],
  ['Divorciada',1],
  ['Viúva', 0]
]
export const data3 = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["COR", 1000, 400, 200],
  ["ESCOLARIDADE", 1170, 460, 250],
  ["ESTADO CIVEL", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];



export const data4 = [
  ["Centro de Aplicação", "Quantidade"],
  ['Abraão',2],
  [  'Agronômica',3],
  [  'Alto Ribeirão',5],
  [  'Armação',1],
  [  'Balneário',0],
  [  'Barra da Lagoa',0],
  [  'Cachoeira do Bom Jesus',0],
  [  'Caieira da Barra do Sul',0],
  [  'Campeche',0],
  [  'Canasvieiras',1],
  [  'Canto da Lagoa',0],
  [  'Capivari',2],
  [  'Capoeiras',2],
  [  'Carianos',0],
  [  'Centro',10],
  [  'Coloninha',0],
  [  'Coqueiros',0],
  [  'Córrego Grande',2],
  [  'Costa da Lagoa',1],
  [  'Costeira do Pirajubaé',0],
  [  'Estreito',0],
  [  'Fazenda do Rio Tavares',3],
  [  'Ingleses',2],
  [  'Itacorubi',0],
  [  'Jardim Atlântico',0],
  [  'João Paulo',0],
  [  'Jurerê',0],
  [  'Lagoa da Conceição',0],
  [  'Monte Cristo',0],
  [  'Monte Serrat',0],
  [  'Morro das Pedras',0],
  [  'Novo Continente',0],
  [  'Pantanal',0],
  [  'Pântano do Sul',0],
  [  'Ponta das Canas',2],
  [  'Prainha',5],
  [  'Ratones',5],
  [  'Ribeirão da Ilha',3],
  [  'Rio Tavares',1],
  [  'Rio Vemelho',1],
  [  'Saco dos Limões',0],
  [  'Saco Grande',0],
  [  'Santinho',0],
  [  'Santo Antônio de Lisboa',0],
  [  'Sapé',0],
  [  'Tapera',0],
  [  'Trindade',8],
  [  'Vargem Grande',0],
  [  'Vargem Pequena',0],
  [  'Vila Aparecida',0],
  [  'Policlínica Centro',0],
  [  'Policlínica Rio Tavares',0],
  [  'Policlínica Continente',0],
  [  'Policlínica da Mulher e da Criança',0]
];

export default function Dashboard() {
  return (
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', flexDirection: 'column', alignItems: 'normal' }}>
  
          <Box sx={{ display: 'flex', width: '25%'}}>
            <Navbar/>
          </Box>
       
          
            <Box sx={{ height: '100%', width: '85%', display: 'flex', flexDirection: 'column', padding: '8px', alignSelf: 'end'}}>
              
              <Box sx={{ height: '100%', width: '100%', padding: '8px', display: 'flex', flexDirection: 'row'}}>
                <Box sx={{ height: '100%', width: '50%',  padding: '4px'}}>
                    <Chart
                      chartType="Line"
                      width="100%"
                      height="100%"
                      data={data}
                      options={options}
                    />
                </Box>
                <Box sx={{ height: '100%', width: '50%',  padding: '8px', display: 'flex', flexDirection: 'column'}}>
                  <Box sx={{ height: '50%', width: '100%'}}>
                        <Chart
                          chartType="PieChart"
                          width="100%"
                          height="100%"
                          data={data2}
                          options={options2}
                        />
                  </Box>
                  <Box sx={{ height: '100%', width: '100%',  display: 'flex', flexDirection: 'row'}}>
                    <Box sx={{ height: '100%', width: '33%', display: 'flex', flexDirection: 'column'}}>
                      <Typography sx={{fontWeight: 'bold'}}>Registro por Escolaridade</Typography>
                        <Chart
                          chartType="ColumnChart"
                          width="100%"
                          height="100%"
                          data={dataEscolaridade}
                          style={{flexShrink:1, padding:'2px'}}
                        />
                    </Box>
                        <Box sx={{ height: '100%', width: '33%',  display: 'flex', flexDirection: 'column'}}>
                        <Typography sx={{fontWeight: 'bold'}}>Registro por Cor/Raça</Typography>
                         <Chart
                          chartType="ColumnChart"
                          width="100%"
                          height="100%"
                          data={dataRaca}
                          style={{flexShrink:1, padding:'2px'}}
                        />
                        </Box>
                        <Box sx={{ height: '100%', width: '33%',  display: 'flex', flexDirection: 'column'}}>
                        <Typography sx={{fontWeight: 'bold'}}>Registro por Estado Civil</Typography>
                         <Chart
                          chartType="ColumnChart"
                          width="100%"
                          height="100%"
                          data={dataEstadoCivil}
                          style={{flexShrink:1, padding:'2px'}}
                        />
                        </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{height: '50%', width: '100%', padding: '8px', display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{fontWeight: 'bold'}}>Registros por Unidades de Saúde</Typography>
                <Chart chartType="ColumnChart" width="100%" height="100%" data={data4} />
              </Box>
            
            </Box>
            
            
      </Box>
  )
}
