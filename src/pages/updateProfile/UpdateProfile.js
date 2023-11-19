import { Container, Grid, Typography } from '@mui/material';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { ColorButton } from '../../components/ColorButton';
import { TextFormField } from '../../formFields/TextFormField';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { validateYupSchemaMultiErrors } from '../validateFormikMultiErrors';
import { updateSchema } from './validateUpdateProfile';

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
      onSubmit: values => {
         updateUserProfile(values.displayName, values.password, values.currentPassword);
         resetForm();
      }
   });

   const { resetForm, handleSubmit } = updateProfileFormik

   return (
      <Container>
         <FormikProvider value={updateProfileFormik}>
            <Form onSubmit={handleSubmit} className="form-container">
               {user.providerData[0].providerId === 'google.com' ?
                  <p>{"You are sign in with Google account. You can't change your profile data from here."}</p>
                  :
                  <>
                     <Grid container spacing={2}>
                        <Grid item>
                           <Field
                              label="Display name"
                              name="displayName"
                              component={TextFormField}
                           />
                        </Grid>
                        <Grid item>
                           <Field
                              label="Email"
                              name="email"
                              component={TextFormField}
                              disabled
                           />
                        </Grid>
                        <Grid item>
                           <Field
                              label="Current password"
                              name="currentPassword"
                              type="password"
                              component={TextFormField}
                           />
                        </Grid>
                        <Grid item>
                           <Field
                              label="Password"
                              name="password"
                              type="password"
                              component={TextFormField}
                           />
                        </Grid>
                        <Grid item>
                           <Field
                              label="Password confirmation"
                              name="passwordConfirm"
                              type="password"
                              component={TextFormField}
                           />
                        </Grid>
                        <Grid item>
                           {!isPending ?
                              <ColorButton type="submit">Update</ColorButton>
                              :
                              <ColorButton disabled>Loading</ColorButton>
                           }
                           {error && <p className="firebase-error">{error}</p>}
                           {success && <p className="firebase-success">{success}</p>}
                        </Grid>
                     </Grid>
                  </>
               }
            </Form>
         </FormikProvider>
         <div className="below-container">
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
               <Link to="/">back</Link>
            </Typography>
         </div>
      </Container>
   );
}
