import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
   const { logout } = useLogout();
   const { user } = useAuthContext();

   return (
      <nav className={styles.navbar}>
         <ul>
            <li className={styles.title}>Where's my money?!</li>

            {!user && (
               <>
                  <li><Link to="link">YouTube link</Link></li>
                  <li><Link to="login">Login</Link></li>
                  <li><Link to="signup">Sign up</Link></li>
               </>
            )}
            {user && (
               <>
                  <li>hello, {user.displayName}</li>
                  <li>
                     <button className="btn" onClick={logout}>Logout</button>
                     <Link className="btn" to="updateProfile">Profile</Link>
                  </li>
               </>
            )}
         </ul>
      </nav>
   );
}
