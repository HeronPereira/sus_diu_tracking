import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { messageStyles } from '../utils/utils';



export default function AlertComponent({isOpen, setIsOpen, message, messageType}: {isOpen: boolean, setIsOpen: (inf: boolean) => void, message: string, messageType: messageStyles}) {
  
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={isOpen}>
        <Alert
          severity={messageType}
          action={
            <IconButton
              aria-label="close"
              color={messageType}
              size="small"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CloseIcon fontSize={'medium'} />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}