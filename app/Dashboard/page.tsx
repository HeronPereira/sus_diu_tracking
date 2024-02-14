"use client"

import Navbar from '../components/Navbar'
import { Box, Typography } from '@mui/material'

import React from "react";
import { Chart } from "react-google-charts";
import { useRouter } from 'next/navigation'
import { defaultDictionary, escolaridadeOptions, estadoCivilOptions, racaOptions, unidades_centro_de_atendimentos } from '../utils/utils'
import axios from 'axios'
import dayjs from 'dayjs'


export const data = [
  [{ type: "date", label: "Day" }, "Quantidade de registros"],
  [new Date(2014, 0), 1],
  [new Date(2014, 1), 2],
];

export const options = {
  chart: {
    title: "Registros de acordo com o tempo",
  },
  series: {
    // Gives each series an axis name that matches the Y-axis below.
    0: { axis: "Registros" },
  },
  axes: {
    // Adds labels to each axis; they don't have to match the axis names.
    y: {
      Registros: { label: "Quantidade de registros" },
    },
  },
};


export const data2 = [
  ["Modelo", "Quantidade aplicada"],
  ["Prata", 2],
  ["Mirena", 2],
];

export const options2 = {
  title: "Relação busca por DIU por idade",
  pieHole: 0.4,
  is3D: false,
};
export const options3 = {
  title: "Relação busca por DIU por escolaridade",
  pieHole: 0.4,
  is3D: false,
};
export const options4 = {
  title: "Relação busca por DIU por raça ou cor",
  pieHole: 0.4,
  is3D: false,
};
export const options5 = {
  title: "Relação busca por DIU por estado civil",
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

// Function to count elements within a specific year and month
const countElementsInRange = (
  array: dayjs.Dayjs[],
  targetYear: number,
  targetMonth: number
): number => {
  return array.reduce((count, date) => {
    // Check if the date is within the specified year and month
    if (date.year() === targetYear && date.month() === targetMonth) {
      return count + 1;
    }
    return count;
  }, 0);
};

const getAge = (date: dayjs.Dayjs) => {
  return dayjs().diff(date, 'year');
}



/* ------------------------------------------------------------------------------------------------------------------- */
export default function Dashboard() {

 
  const router = useRouter();
  const age = dayjs();
  const [databaseRows, setDatabaseRows] = React.useState<typeof defaultDictionary[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadCharts, setLoadCharts] = React.useState(false);

  let chart1Data: typeof data = [["Data de registro", "Quantidade de registros"]];
  let chart2Data: typeof data2 = [["Faixa de idade", "Quantidade de registros"]];
  let chart3Data: typeof data2 = [["Escolaridade", "Quantidade de registros"]];
  let chart4Data: typeof data2 = [["Cor ou raça", "Quantidade de registros"]];
  let chart5Data: typeof data2 = [["Estado civil", "Quantidade de registros"]];
  let chart6Data: typeof data2 = [["Estado civil", "Quantidade de registros"]];

  const [chart1DataShow, setChart1DataShow] = React.useState<typeof chart1Data>();
  const [chart2DataShow, setChart2DataShow] = React.useState<typeof chart2Data>();
  const [chart3DataShow, setChart3DataShow] = React.useState<typeof chart3Data>();
  const [chart4DataShow, setChart4DataShow] = React.useState<typeof chart4Data>();
  const [chart5DataShow, setChart5DataShow] = React.useState<typeof chart5Data>();
  const [chart6DataShow, setChart6DataShow] = React.useState<typeof chart6Data>();


  // Chart1: Line chart registers per Time
  const updateChar1Data = () => {

   // get the range of the registers
   let sortYear = [];
   let sortDate = [];
   
   for (let patient of databaseRows) {
      sortDate.push(patient.nascimento);
     sortYear.push(dayjs(patient.nascimento).get('year'));
    
   
   }

   // get the oldest and newest year in the registers and the correspondent months
   const oldestYear = Math.min(...sortYear);
   const oldestMonth = dayjs(sortDate[sortYear.indexOf(oldestYear)]).get('month');
   const newestYear = dayjs().get('year');
   const newestMonth = dayjs().get('month');
   
   console.log(sortDate);
   console.log(oldestYear, oldestMonth);
   console.log(newestYear, newestMonth);
   // create an array of dayjs that starts at oldest year and correspondent month until today
   const dateRange = [];
   let countY = 0;
   let countM = 0;
   let j = oldestMonth;
   for (let i = oldestYear; i <= newestYear; i++) {
     // Run through each year
     if(i != newestYear)
     {
       while(j < 12)
       {
         dateRange.push(dayjs().year(i).month(j));
        j++;
       }
     }
     else
     {
       while(j <= newestMonth)
       {
         dateRange.push(dayjs().year(i).month(j));

        j++;
       }
     }
     j = 0;

   }

   // go through range and count registers from the database
   console.log(dateRange[0]);
   let registrosNaData: typeof data = chart1Data;

   const dateArray: dayjs.Dayjs[] = sortDate.map(dateValue => dayjs(dateValue));
   
   
   for (let date of dateRange) {
      const count = countElementsInRange(dateArray, date.year(), date.month());
    //  chart1Data.push([dayjs(date).toDate().toString(), count.toString()]);
    let registro = [dayjs(date).toDate(), count];
     registrosNaData.push(registro);
     console.log(registrosNaData);
     chart1Data = registrosNaData;
   }
   
   //console.log(dateRange);
   setChart1DataShow(chart1Data);
   console.log(chart1Data);

  }

  // Chart2: Pie chart percent of registers per age
  const updateChart2Data = () => {
    const ageRange = ['16 ou menos', '17 a 25', '26 a 35', '36 a 45', '46 a 55', '56 ou mais'];

    const registers = [0, 0, 0, 0, 0, 0];

    for (let patient of databaseRows) {
      const age = getAge(dayjs(patient.nascimento));
      if (age < 16) {
        registers[0] += 1;
      } else if (age >= 16 && age < 26) {
        registers[1] += 1;
      } else if (age >= 26 && age < 36) {
        registers[2] += 1;
      } else if (age >= 36 && age < 46) {
        registers[3] += 1;
      } else if (age >= 46 && age < 56) {
        registers[4] += 1;
      } else if (age >= 56) {
        registers[5] += 1;
      }
    }

    for (let i in ageRange) {

      chart2Data.push([ageRange[i], registers[i]]);
    }

    setChart2DataShow(chart2Data);
    console.log(chart2Data);
  }

  // Chart3: Pie chart percent of registers per escolaridade
  const updateChart3Data = () => {
    const options = escolaridadeOptions;

    let counts = Array.from({length: options.length}, () => 0); 

    for (let patient of databaseRows) {
      for(let i in options)
      {
        if(patient.escolaridade == options[i])
        {
          counts[i] += 1;
        }
      }
    }

    
    for (let i in options)
    {
      chart3Data.push([options[i], counts[i]]);
    }
    setChart3DataShow(chart3Data);

  }
  // Chart4: Pie chart percent of registers per cor
  const updateChart4Data = () => {
    const options = racaOptions;

    let counts = Array.from({length: options.length}, () => 0); 

    for (let patient of databaseRows) {
      for(let i in options)
      {
        if(patient.cor == options[i])
        {
          counts[i] += 1;
        }
      }
    }
    
    for (let i in options)
    {
      chart4Data.push([options[i], counts[i]]);
    }
    setChart4DataShow(chart4Data);
    console.log(chart4Data);
  }

  // Chart5: Pie chart percent of registers per estadoCivil
  const updateChart5Data = () => {
    const options = estadoCivilOptions;

    let counts = Array.from({length: options.length}, () => 0); 

    for (let patient of databaseRows) {
      for(let i in options)
      {
        if(patient.estadoCivil == options[i])
        {
          counts[i] += 1;
        }
      }
    }

    
    for (let i in options)
    {
      chart5Data.push([options[i], counts[i]]);
    }
    setChart5DataShow(chart3Data);

  }
  
    // Chart5: Pie chart percent of registers per estadoCivil
    const updateChart6Data = () => {
      const options = unidades_centro_de_atendimentos;
  
      let counts = Array.from({length: options.length}, () => 0); 
  
      for (let patient of databaseRows) {
        for(let i in options)
        {
          if(patient.centroSaudeReferencia == options[i])
          {
            counts[i] += 1;
          }
        }
      }
  
      
      for (let i in options)
      {
        chart6Data.push([options[i], counts[i]]);
      }
      setChart6DataShow(chart6Data);
  
    }
    
  const getDatabase = async () => {
    
    try {
      const database = await axios.get('/api/patients/');
      setDatabaseRows(database.data);
      setIsLoading(false);
      
      setLoadCharts(true);

    } 
    catch (error) {
      console.error(error);
      console.log('Not possible to GET database');
      setIsLoading(false);
      
      setLoadCharts(true);
    }
  }
  React.useEffect(() => {
    getDatabase();
  }, []);

  React.useEffect(() => {
    if(loadCharts)
    {
      updateChar1Data();
      updateChart2Data();
      updateChart3Data();
      updateChart4Data();
      updateChart5Data();
      updateChart6Data();
      setLoadCharts(false);
    }
  }, [loadCharts, 
    chart1Data, chart1DataShow, 
    chart2Data, chart2DataShow, 
    chart3Data, chart3DataShow, 
    chart4Data, chart4DataShow, 
    chart5Data, chart5DataShow, 
    chart6Data, chart6DataShow]);
  
  if(isLoading){
  
    return <div>Loading...</div>
  }

 
  
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
                      data={chart1DataShow}
                      options={options}
                    />
                </Box>
                <Box sx={{ height: '100%', width: '50%',  padding: '8px', display: 'flex', flexDirection: 'column'}}>
                  <Box sx={{ height: '50%', width: '100%'}}>
                        <Chart
                          chartType="PieChart"
                          width="100%"
                          height="100%"
                          data={chart2DataShow}
                          options={options2}
                        />
                  </Box>
                  <Box sx={{ height: '100%', width: '100%',  display: 'flex', flexDirection: 'row'}}>
                    <Box sx={{ height: '100%', width: '33%', display: 'flex', flexDirection: 'column'}}>
                      <Chart
                          chartType="PieChart"
                          width="100%"
                          height="100%"
                          data={chart3DataShow}
                          options={options3}
                        />
                    </Box>
                        <Box sx={{ height: '100%', width: '33%',  display: 'flex', flexDirection: 'column'}}>
                        <Chart
                          chartType="PieChart"
                          width="100%"
                          height="100%"
                          data={chart4DataShow}
                          options={options4}
                        />
                        </Box>
                        <Box sx={{ height: '100%', width: '33%',  display: 'flex', flexDirection: 'column'}}>
                        <Chart
                          chartType="PieChart"
                          width="100%"
                          height="100%"
                          data={chart5DataShow}
                          options={options5}
                        />
                        </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{height: '50%', width: '100%', padding: '8px', display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{fontWeight: 'bold'}}>Registros por Unidades de Saúde</Typography>
                <Chart chartType="ColumnChart" width="100%" height="100%" data={chart6DataShow} />
              </Box>
            
            </Box>
            
            
      </Box>
  )
}
