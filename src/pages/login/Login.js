import { useLogin } from '../../hooks/useLogin';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { loginSchema } from './validateLogin';
import { GoogleButton } from 'react-google-button';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';
import './Login.css';
import Separator from '../../components/Separator';
import { TextFormField } from '../../formFields/TextFormField';
import { Grid } from '@mui/material';
import { ColorButton } from '../../components/ColorButton';

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
            <Grid
               container
               alignItems="center"
               justifyContent="center"
            >
               <Grid item mb={2}>
                  <h2>Please log in:</h2>
               </Grid>
               <Grid item mb={2}>
                  <Field
                     label="Email:"
                     name="email"
                     component={TextFormField}
                  />
               </Grid>
               <Grid item mb={2}>
                  <Field
                     label="Password:"
                     name="password"
                     type="password"
                     component={TextFormField}
                  />
               </Grid>
               <Grid item>
                  {!isPending && <ColorButton type="submit" disabled={isSubmitting}>Login</ColorButton>}
                  {isPending && <ColorButton disabled>Loading</ColorButton>}
               </Grid>
               <Grid item>
                  {error && <p className="firebase-error">{error}</p>}
               </Grid>
               <Grid item>
                  <Separator label="OR" />
                  {!isGooglePending && <GoogleButton style={{ width: '220px' }} label="Login with Google" onClick={googleSignIn} />}
                  {isGooglePending && <GoogleButton style={{ width: '220px' }} label="Loading" disabled />}
               </Grid>
               <Grid item>
                  {googleError && <p className="firebase-error">{error}</p>}
               </Grid>
            </Grid>
         </Form>
      </FormikProvider>
   );
}
