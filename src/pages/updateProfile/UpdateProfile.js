import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { updateSchema } from './validateUpdateProfile';
import { validateYupSchemaMultiErrors } from '../validateFormikMultiErrors';
import { TextFormField } from '../../formFields/TextFormField';
import { Grid } from '@mui/material';

export default function UpdateProfile() {
   const { user } = useAuthContext();
   const { updateUserProfile, error, isPending, success } = useUpdateProfile();

   const updateProfileFormik = useFormik({
      initialValues: {
         displayName: user.displayName,
         email: user.email,
         currentPassword: "",
         password: "",
         passwordConfirm: "",
      },
      validate: values => validateYupSchemaMultiErrors(values, updateSchema),
      onSubmit: values => updateUserProfile(values.displayName, values.password, values.currentPassword)
   });

   const { isSubmitting, handleSubmit } = updateProfileFormik

   return (
      <div className="container">
         <div className="content">
            <FormikProvider value={updateProfileFormik}>
               <Form onSubmit={handleSubmit} className="login-form">
                  {user.providerData[0].providerId === 'google.com' ?
                     <p>{"You are sign in with Google account. You can't change your profile data from here."}</p>
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
                              disabled
                           />
                        </Grid>

                        <Grid>
                           <Field
                              label="Current password:"
                              name="currentPassword"
                              type="password"
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


                        {!isPending && <button type="submit" disabled={isSubmitting} className="btn">Update</button>}
                        {isPending && <button className="btn" disabled>Loading</button>}
                        {error && <p className="firebase-error">{error}</p>}
                        {success && <p className="firebase-success">{success}</p>}
                     </>
                  }
               </Form>
            </FormikProvider>
         </div>
         <div className="sidebar">
            <Link className='btn' to="/">Go Back</Link>
         </div>
      </div>
   );
}
