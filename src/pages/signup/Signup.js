import { useSignup } from '../../hooks/useSignup';
import { useFormik } from 'formik';
import { signupSchema } from './validateSignup';
import { validateYupSchemaMultiErrors } from '../validateFormikMultiErrors';
import { GoogleButton } from 'react-google-button';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';
import './Signup.css';
import Separator from '../../components/Separator';

export default function Signup() {
   const { signup, isPending, error, verificationMail } = useSignup();
   const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

   const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: {
         displayName: "",
         email: "",
         password: "",
         passwordConfirm: "",
      },
      validate: values => validateYupSchemaMultiErrors(values, signupSchema),
      onSubmit: values => signup(values.email, values.password, values.displayName),
   });

   return (
      <form onSubmit={handleSubmit} className="signup-form">
         <h2>Create your account:</h2>
         {verificationMail ?
            <p className="success">{"A verification email has been sent to your account. Please confirm it. If you can't find it, check your spam box. ;)"}</p>
            :
            <>
               <label>
                  <span>Display name:</span>
                  <input
                     value={values.displayName}
                     onChange={handleChange}
                     id="displayName"
                     type="text"
                     onBlur={handleBlur}
                     className={errors.displayName && touched.displayName ? "input-error" : ""}
                  />
                  {errors.displayName && touched.displayName && <p>{errors.displayName}</p>}
               </label>
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
               <label>
                  <span>Password confirmation:</span>
                  <input
                     id="passwordConfirm"
                     type="password"
                     value={values.passwordConfirm}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className={errors.passwordConfirm && touched.passwordConfirm ? "input-error" : ""}
                  />
                  {errors.passwordConfirm && touched.passwordConfirm && (<p>{errors.passwordConfirm}</p>)}
               </label>
               <div className="center">
                  {!isPending && <button type="submit" disabled={isSubmitting} className="btn">Sign up</button>}
                  {isPending && <button className="btn" disabled>Loading</button>}
                  {error && <p className="firebase-error">{error}</p>}
               </div>
               <Separator label="OR" />
               <div className="center">
                  {!isGooglePending && <GoogleButton label="Sign up with Google" onClick={googleSignIn} />}
                  {isGooglePending && <GoogleButton label="Loading" disabled />}
                  {googleError && <p className="firebase-error">{error}</p>}
               </div>
            </>
         }
      </form >
   );
}
