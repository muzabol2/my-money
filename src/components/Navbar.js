import { Link } from 'react-router-dom';
import './Navbar.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
   const { logout } = useLogout();
   const { user } = useAuthContext();

   return (
      <nav className="navbar">
         <div className="title">{`Where's my money?! (${process.env.REACT_APP_NAVBAR_TITLE})`}</div>
         <div className="links">
            <ul>
               {!user && (
                  <>
                     <li><Link to="login">Login</Link></li>
                     <li><Link to="signup">Sign up</Link></li>
                     <li><Link to="inspiration">Inspiration</Link></li>
                  </>
               )}
               {user && (
                  <>
                     <li>hello, {user.displayName}</li>
                     <li><Link to="categories">Categories</Link></li>
                     <li><button className="btn" onClick={logout}>Logout</button></li>
                     {user.providerData[0].providerId !== 'google.com' && (
                        <li><Link className="btn" to="updateProfile">Profile</Link></li>
                     )}
                  </>
               )}
            </ul>
         </div>
      </nav>
   );
}
