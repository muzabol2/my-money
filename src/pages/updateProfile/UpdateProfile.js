import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import styles from './UpdateProfile.module.css';
import { validateUpdateProfile } from './validateUpdateProfile';

export default function UpdateProfile() {
   const { user } = useAuthContext();
   const { updateProfile, error, isPending, success } = useUpdateProfile();

   const initialFormValues = {
      currentPassword: "",
      displayName: user.displayName,
      email: user.email,
      password: "",
      passwordConfirm: ""
   };
   const [formValues, setFormValues] = useState(initialFormValues);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validateUpdateProfile(formValues));
      setIsSubmit(true);
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
   };

   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         updateProfile(
            formValues.email,
            formValues.displayName,
            formValues.password,
            formValues.currentPassword
         );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [formErrors, isSubmit]);

   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <form onSubmit={handleSubmit} className={styles['update-form']}>
               <label>
                  <span><strong>Current password:</strong></span>
                  <input
                     name="currentPassword"
                     type="password"
                     value={formValues.currentPassword}
                     onChange={handleChange}
                     placeholder="Mandatory to make any changes"
                  />
                  <p>{formErrors.currentPassword}</p>
               </label>
               <label>
                  <span>Display name:</span>
                  <input
                     name="displayName"
                     type="text"
                     value={formValues.displayName}
                     onChange={handleChange}
                  />
                  <p>{formErrors.displayName}</p>
               </label>
               <label>
                  <span>Email:</span>
                  <input
                     name="email"
                     value={formValues.email}
                     onChange={handleChange}
                  />
                  <p>{formErrors.email}</p>
               </label>
               <label>
                  <span>New password:</span>
                  <input
                     name="password"
                     type="password"
                     value={formValues.password}
                     onChange={handleChange}
                     placeholder="Leave blank to keep the same"
                  />
                  <p>{formErrors.password}</p>
               </label>
               <label>
                  <span>Confirm new password:</span>
                  <input
                     name="passwordConfirm"
                     type="password"
                     value={formValues.passwordConfirm}
                     onChange={handleChange}
                     placeholder="Leave blank to keep the same"
                  />
                  <p>{formErrors.passwordConfirm}</p>
               </label>
               {!isPending && <button className="btn">Update</button>}
               {isPending && <button className="btn" disabled>Loading</button>}
               {error && <p className={styles['error']}>{error}</p>}
               {success && <p className={styles['success']}>{success}</p>}
            </form>
         </div>
         <div className={styles.sidebar}>
            <Link className='btn' to="/">Go Back</Link>
         </div>
      </div>
   );
}
