import Image from 'next/image'
import TabRegister from '../components/TabRegister'

import Navbar from '../components/Navbar'
import { Box, Grid } from '@mui/material'

export default function CadastroPaciente() {
  return (

        <Grid container >
          <Grid item xs={12} sm={2}>
          <Navbar/>
          </Grid>
          
          <Grid item xs={12} sm={10}>
            <TabRegister/>
          </Grid>
        </Grid>

  )
}
