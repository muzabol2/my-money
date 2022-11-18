import { useSignup } from '../../hooks/useSignup';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { signupSchema } from './validateSignup';
import { validateYupSchemaMultiErrors } from '../validateFormikMultiErrors';
import { GoogleButton } from 'react-google-button';
import Separator from '../../components/Separator';
import { TextFormField } from '../../formFields/TextFormField';
import { Grid } from '@mui/material';
import { ColorButton } from '../../components/ColorButton';

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
      <div className="login-form">
         {verificationMail ?
            <p className="firebase-success">
               {"A verification email has been sent to your account. Please confirm it. If you can't find it, check your spam box. ;)"}
            </p>
            :
            <FormikProvider value={signupFormik}>
               <Form onSubmit={handleSubmit}>
                  <Grid
                     container
                     alignItems="center"
                     justifyContent="center"
                  >
                     <Grid item mb={2}>
                        <h2>Create account:</h2>
                     </Grid>
                     <Grid item>
                        {!isGooglePending && <GoogleButton style={{ width: '220px' }} label="Log in with Google" onClick={googleSignIn} />}
                        {isGooglePending && <GoogleButton style={{ width: '220px' }} label="Loading" disabled />}
                        {googleError && <p className="firebase-error">{error}</p>}
                        <Separator label="OR" />
                     </Grid>
                     <Grid item mb={1}>
                        <Field
                           label="Display name:"
                           name="displayName"
                           component={TextFormField}
                        />
                     </Grid>
                     <Grid item mb={1}>
                        <Field
                           label="Email:"
                           name="email"
                           component={TextFormField}
                        />
                     </Grid>
                     <Grid item mb={1}>
                        <Field
                           label="Password:"
                           name="password"
                           type="password"
                           component={TextFormField}
                        />
                     </Grid>
                     <Grid item mb={1}>
                        <Field
                           label="Password confirmation:"
                           name="passwordConfirm"
                           type="password"
                           component={TextFormField}
                        />
                     </Grid>
                     <Grid item>
                        {!isPending && <ColorButton type="submit" disabled={isSubmitting}>Sign up</ColorButton>}
                        {isPending && <ColorButton disabled>Sign up</ColorButton>}
                     </Grid>
                     <Grid item>
                        {error && <p className="firebase-error">{error}</p>}
                     </Grid>
                  </Grid>
               </Form>
            </FormikProvider>
         }
      </div>
   );
}
