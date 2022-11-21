import MenuProfilePopup from './MenuProfilePopup';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {

   return (
      <AppBar sx={{ backgroundColor: "#effaf0", color: "black" }}>
         <Toolbar sx={{ alignItems: 'center', justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
               <Link to="/" style={{ textDecoration: 'none', color: "black", fontWeight: 'bold' }}>
                  Where's my money?!
               </Link>
            </Typography>
            <MenuProfilePopup />
         </Toolbar>
      </AppBar>
   );
}
