import { useEffect, useState } from 'react';
import styles from './Signup.module.css';
import { useSignup } from "../../hooks/useSignup";
import { validateSignup } from './validateSignup';

export default function Signup() {
   const { signup, isPending, error, verificationMail } = useSignup();
   const initialFormValues = {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: ""
   };
   const [formValues, setFormValues] = useState(initialFormValues);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validateSignup(formValues));
      setIsSubmit(true);
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
   };

   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         signup(formValues.email, formValues.password, formValues.displayName);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [formErrors, isSubmit]);

   return (
      <form onSubmit={handleSubmit} className={styles['signup-form']}>
         <h2>Sign up</h2>
         {verificationMail ?
            <p className={styles['success']}>{"A verification email has been sent to your account. Please confirm it. If you can't find it, check your spam box. ;)"}</p>
            :
            <>
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
                  <span>Password:</span>
                  <input
                     name="password"
                     type="password"
                     value={formValues.password}
                     onChange={handleChange}
                  />
                  <p>{formErrors.password}</p>
               </label>
               <label>
                  <span>Password confirmation:</span>
                  <input
                     name="passwordConfirm"
                     type="password"
                     value={formValues.passwordConfirm}
                     onChange={handleChange}
                  />
                  <p>{formErrors.passwordConfirm}</p>
               </label>
               {!isPending && <button className="btn">Sign up</button>}
               {isPending && <button className="btn" disabled>Loading</button>}
               {error && <p className={styles['error']}>{error}</p>}
            </>
         }
      </form>
   );
}
