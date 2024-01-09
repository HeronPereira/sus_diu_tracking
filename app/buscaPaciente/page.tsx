import Image from 'next/image'

import Navbar from '../components/Navbar'
import { Box, Grid } from '@mui/material'
import SearchTable from '../components/SearchTable'

export default function BuscaPaciente() {
  return (
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', flexDirection: 'column' }}>
        <Grid container >
          <Grid item xs={12} sm={2}>
          <Navbar/>
          </Grid>
          
          <Grid item xs={12} sm={10}>
            <SearchTable/>
          </Grid>
        </Grid>
      </Box>
  )
}
