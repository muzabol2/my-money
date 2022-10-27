import { useSignup } from '../../hooks/useSignup';
import { useGoogleSignIn } from '../../hooks/useGoogleSignIn';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { signupSchema } from './validateSignup';
import { validateYupSchemaMultiErrors } from '../validateFormikMultiErrors';
import { GoogleButton } from 'react-google-button';
import Separator from '../../components/Separator';
import { TextFormField } from '../../formFields/TextFormField';
import { Grid } from '@mui/material';
import './Signup.css';

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
            <h2>Create your account:</h2>
            {verificationMail ?
               <p className="firebase-success">
                  {"A verification email has been sent to your account. Please confirm it. If you can't find it, check your spam box. ;)"}
               </p>
               :
               <>
                  <Grid>
                     <Field
                        label="Display name:"
                        name="displayName"
                        component={TextFormField}
                     />
                  </Grid>

                  <Grid>
                     <Field
                        label="Email:"
                        name="email"
                        component={TextFormField}
                     />
                  </Grid>

                  <Grid>
                     <Field
                        label="Password:"
                        name="password"
                        type="password"
                        component={TextFormField}
                     />
                  </Grid>

                  <Grid>
                     <Field
                        label="Password confirmation:"
                        name="passwordConfirm"
                        type="password"
                        component={TextFormField}
                     />
                  </Grid>

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
         </Form>
      </FormikProvider>
   );
}
