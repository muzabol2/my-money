import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import styles from './UpdateProfile.module.css';

export default function UpdateProfile() {
   const { user } = useAuthContext();
   const [email, setEmail] = useState(user.email);
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');
   const [currentPassword, setCurrentPassword] = useState('');
   const [displayName, setDisplayName] = useState(user.displayName);

   const { updateProfile, error, isPending } = useUpdateProfile();

   const handleSubmit = (e) => {
      e.preventDefault();
      updateProfile(email, displayName, password, passwordConfirm, currentPassword);
   }

   return (
      <div className={styles.container}>
         <h2>Update Profile</h2>
         <div className={styles.sidebar}>
            <Link className='btn' to="/">Go Back</Link>
         </div>
         <div className={styles.content}>
            <form onSubmit={handleSubmit} className={styles['update-form']}>
               <label>
                  <span><strong>Current password:</strong></span>
                  <input
                     type="password"
                     onChange={(e) => setCurrentPassword(e.target.value)}
                     value={currentPassword}
                     required
                     placeholder="Mandatory to make any changes"
                  />
               </label>
               <label>
                  <span>Display name:</span>
                  <input
                     type="text"
                     maxLength={20}
                     onChange={(e) => setDisplayName(e.target.value)}
                     value={displayName}
                  />
               </label>
               <label>
                  <span>Email:</span>
                  <input
                     type="email"
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                  />
               </label>
               <label>
                  <span>New password:</span>
                  <input
                     type="password"
                     onChange={(e) => setPassword(e.target.value)}
                     minLength={6}
                     value={password}
                     placeholder="Leave blank to keep the same"
                  />
               </label>
               <label>
                  <span>Confirm new password:</span>
                  <input
                     type="password"
                     onChange={(e) => setPasswordConfirm(e.target.value)}
                     value={passwordConfirm}
                     placeholder="Leave blank to keep the same"
                  />
               </label>
               {!isPending && <button className="btn">Update</button>}
               {isPending && <button className="btn" disabled>Loading</button>}
               {error && <p className="error">{error}</p>}

            </form>
         </div>
         
      </div>
   );
}
