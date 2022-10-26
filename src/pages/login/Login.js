import { useLogin } from '../../hooks/useLogin';
import { useFormik } from 'formik';
import { loginSchema } from './validateLogin';
import { GoogleButton } from 'react-google-button';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';
import './Login.css';
import Separator from '../../components/Separator';

export default function Login() {
   const { login, error, isPending } = useLogin();
   const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

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
         <h2>Please log in:</h2>
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
         <div className="center">
            {!isPending && <button type="submit" disabled={isSubmitting} className="btn">Login</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <p className="firebase-error">{error}</p>}
         </div>
         <Separator label="OR" />
         <div className="center">
            {!isGooglePending && <GoogleButton label="Login with Google" onClick={googleSignIn} />}
            {isGooglePending && <GoogleButton label="Loading" disabled />}
            {googleError && <p className="firebase-error">{error}</p>}
         </div>
      </form>
   );
}
