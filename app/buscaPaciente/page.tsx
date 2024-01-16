import Image from 'next/image'

import Navbar from '../components/Navbar'
import { Box, Grid } from '@mui/material'
import SearchTable from '../components/SearchTable'
import FileUpload from '../components/FileUpload'
import FileDownload from '../components/FileDownload'

export default function BuscaPaciente() {
  return (
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', flexDirection: 'column' }}>
        <Grid container >
          <Grid item xs={12} sm={2}>
          <Navbar/>
          </Grid>
          <FileUpload/>
          <FileDownload fileId="8f10dacb-2753-4237-8bfa-cd40916ac4e7" />

          <Grid item xs={12} sm={10}>
            <SearchTable/>
          </Grid>
        </Grid>
      </Box>
  )
}
