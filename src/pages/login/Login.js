import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useLogin } from '../../hooks/useLogin';
import { validateLogin } from './validateLogin';

export default function Login() {
   const { login, error, isPending } = useLogin();

   const initialFormValues = { email: "", password: "" };
   const [formValues, setFormValues] = useState(initialFormValues);
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validateLogin(formValues));
      setIsSubmit(true);
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
   };

   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         login(formValues.email, formValues.password);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [formErrors, isSubmit]);

   return (
      <form onSubmit={handleSubmit} className={styles['login-form']}>
         <h2>Login</h2>
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
         {!isPending && <button className="btn">Login</button>}
         {isPending && <button className="btn" disabled>loading</button>}
         {error && <p className={styles['error']}>{error}</p>}
      </form>
   );
}
