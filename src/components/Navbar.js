import MenuProfilePopup from './MenuProfilePopup';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';
import { useThemeContext } from '../hooks/useThemeContext';

export default function Navbar() {
   const { mode } = useThemeContext()

   return (
      <AppBar sx={{ backgroundColor: mode === 'dark' ? '#333' : '#effaf0' }}>
         <Toolbar sx={{ alignItems: 'center', justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
               <Link to="/" style={{ textDecoration: 'none', color: mode === 'dark' ? 'white' : 'black', fontWeight: 'bold' }}>
                  Where's my money?!
               </Link>
            </Typography>
            <div className='flex'>
               <ThemeSelector />
               <MenuProfilePopup />
            </div>
         </Toolbar>
      </AppBar>
   );
}
