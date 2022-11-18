import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const ColorButton = styled(Button)(() => ({
   width: '220px',
   background: 'none',
   border: '2px solid #1f9751',
   color: '#1f9751',
   backgroundColor: '#fff',
   fontWeight: 'bold',
   '&:hover': {
      color: '#fff',
      backgroundColor: '#1f9751',
   },
}));
