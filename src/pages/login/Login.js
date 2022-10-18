import { useLogin } from '../../hooks/useLogin';
import { useFormik } from 'formik';
import { loginSchema } from './validateLogin';
import './Login.css';

export default function Login() {
   const { login, error, isPending } = useLogin();

   const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => login(values.email, values.password)
   });

   return (
      <form onSubmit={handleSubmit} className="login-form" >
         <h2>Login</h2>
         <label>
            <span>Email:</span>
            <input
               value={values.email}
               onChange={handleChange}
               id="email"
               type="email"
               onBlur={handleBlur}
               className={errors.email && touched.email ? "input-error" : ""}
            />
            {errors.email && touched.email && <p>{errors.email}</p>}
         </label>
         <label>
            <span>Password:</span>
            <input
               id="password"
               type="password"
               value={values.password}
               onChange={handleChange}
               onBlur={handleBlur}
               className={errors.password && touched.password ? "input-error" : ""}
            />
            {errors.password && touched.password && (<p>{errors.password}</p>)}
         </label>
         {!isPending && <button type="submit" disabled={isSubmitting} className="btn">Login</button>}
         {isPending && <button className="btn" disabled>Loading</button>}
         {error && <p>{error}</p>}
      </form>
   );
}
