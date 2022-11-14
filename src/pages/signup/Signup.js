import { useSignup } from '../../hooks/useSignup';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { signupSchema } from './validateSignup';
import { validateYupSchemaMultiErrors } from '../validateFormikMultiErrors';
import { GoogleButton } from 'react-google-button';
import Separator from '../../components/Separator';
import { TextFormField } from '../../formFields/TextFormField';
import { Grid } from '@mui/material';

export default function Signup() {
   const { signup, isPending, error, verificationMail } = useSignup();
   const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

   const signupFormik = useFormik({
      initialValues: {
         displayName: "",
         email: "",
         password: "",
         passwordConfirm: "",
      },
      validate: values => validateYupSchemaMultiErrors(values, signupSchema),
      onSubmit: values => signup(values.email, values.password, values.displayName),
   });

   const { isSubmitting, handleSubmit } = signupFormik

   return (
      <FormikProvider value={signupFormik}>
         <Form onSubmit={handleSubmit} className="login-form">
            {verificationMail ?
               <p className="firebase-success">
                  {"A verification email has been sent to your account. Please confirm it. If you can't find it, check your spam box. ;)"}
               </p>
               :
               <>
                  <Grid container spacing={2}>
                     <Grid item>
                        <h2>Create account:</h2>
                     </Grid>
                     <Grid item>
                        {!isGooglePending && <GoogleButton label="Log in with Google" onClick={googleSignIn} />}
                        {isGooglePending && <GoogleButton label="Loading" disabled />}
                        {googleError && <p className="firebase-error">{error}</p>}
                        <Separator label="OR" />
                     </Grid>
                     <Field
                        label="Display name:"
                        name="displayName"
                        component={TextFormField}
                     />
                     <Field
                        label="Email:"
                        name="email"
                        component={TextFormField}
                     />
                     <Field
                        label="Password:"
                        name="password"
                        type="password"
                        component={TextFormField}
                     />
                     <Field
                        label="Password confirmation:"
                        name="passwordConfirm"
                        type="password"
                        component={TextFormField}
                     />
                     <Grid item>
                        {!isPending && <button type="submit" disabled={isSubmitting} className="btn">Sign up</button>}
                        {isPending && <button className="btn" disabled>Loading</button>}
                        {error && <p className="firebase-error">{error}</p>}
                     </Grid>
                  </Grid>

               </>
            }
         </Form>
      </FormikProvider>
   );
}
