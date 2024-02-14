import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Paper } from '@mui/material';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import LineAxisIcon from '@mui/icons-material/LineAxis';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },}}
        
        variant="permanent"
        anchor="left"
      >
        <Paper style={{backgroundColor: '#265D9B', flex: 1, padding: '8px'}}>
          <Box sx={{WebkitTextFillColor: 'white', textAlign: 'center'}}>Sistema de controle de DIU</Box>
          <Toolbar />
          
          <Divider />
          <List>
              <Link href={'/Dashboard'}>
                <ListItem key={'Dashboard'} disablePadding>
                  <ListItemButton sx={{WebkitTextFillColor: 'white', fontWeight: 'bold'}}>
                    <ListItemIcon sx={{color: 'white'}}>
                      <LineAxisIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href={'/cadastroPaciente'}>
                <ListItem key={'Cadastro'} disablePadding>
                  <ListItemButton sx={{WebkitTextFillColor: 'white', fontWeight: 'bold'}}>
                    <ListItemIcon sx={{color: 'white'}}>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Cadastro'} />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href={'/buscaPaciente'}>
                <ListItem key={'Busca'} disablePadding>
                  <ListItemButton sx={{WebkitTextFillColor: 'white', fontWeight: 'bold'}}>
                    <ListItemIcon sx={{color: 'white'}}>
                      <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Busca'} />
                  </ListItemButton>
                </ListItem>
              </Link>
              

              <Divider/>

              <Box sx={{marginTop: '24px'}}>
                <Link href={'/'}>
                  <ListItem key={'Sair'} disablePadding>
                    <ListItemButton sx={{WebkitTextFillColor: 'white', fontWeight: 'bold'}}>
                      <ListItemIcon sx={{color: 'white'}}>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Sair'} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Box>
          
          </List>
        </Paper>
      </Drawer>
  
    </Box>
  );
}
