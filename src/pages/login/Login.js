import { useLogin } from '../../hooks/useLogin';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { loginSchema } from './validateLogin';
import { GoogleButton } from 'react-google-button';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';
import './Login.css';
import Separator from '../../components/Separator';
import { TextFormField } from '../../formFields/TextFormField';
import { Grid } from '@mui/material';

export default function Login() {
   const { login, error, isPending } = useLogin();
   const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

   const loginFornik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => login(values.email, values.password)
   });

   const { isSubmitting, handleSubmit } = loginFornik;

   return (
      <FormikProvider value={loginFornik}>
         <Form onSubmit={handleSubmit} className="login-form">
            <Grid container spacing={2}>
               <Grid item>
                  <h2>Please log in:</h2>
               </Grid>
               <Grid item>
                  <Field
                     label="Email:"
                     name="email"
                     component={TextFormField}
                  />
               </Grid>

               <Grid item>
                  <Field
                     label="Password:"
                     name="password"
                     type="password"
                     component={TextFormField}
                  />
               </Grid>

               <Grid item>
                  {!isPending && <button type="submit" disabled={isSubmitting} className="btn">Login</button>}
                  {isPending && <button className="btn" disabled>Loading</button>}
                  {error && <p className="firebase-error">{error}</p>}
               </Grid>
            </Grid>
            <Separator label="OR" />
            <div className="center">
               {!isGooglePending && <GoogleButton label="Login with Google" onClick={googleSignIn} />}
               {isGooglePending && <GoogleButton label="Loading" disabled />}
               {googleError && <p className="firebase-error">{error}</p>}
            </div>
         </Form>
      </FormikProvider>
   );
}
