import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { validateYupSchemaMultiErrors } from '../validateFormikMultiErrors';
import { categoriesSchema } from './validateCategories';
import { TextFormField } from '../../formFields/TextFormField';
import { Container, Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';

export default function Categories() {
   const { user } = useAuthContext();
   const { documents, error } = useCollection('users', ['uid', '==', user.uid]);
   const { updateCategories, deleteCategories } = useFirestore('users');

   const categoriesFormik = useFormik({
      initialValues: {
         categories: "",
      },
      validate: values => validateYupSchemaMultiErrors(values, categoriesSchema),
      onSubmit: values => {
         updateCategories({ id: user.uid, category: values.categories });
         resetForm();
      }
   });

   const { isSubmitting, handleSubmit, resetForm } = categoriesFormik;

   return (
      <Container>
         <FormikProvider value={categoriesFormik}>
            <Form onSubmit={handleSubmit} className="login-form">
               <Grid item>
                  <h2>Transaction categories:</h2>
               </Grid>
               <Grid container direction="column" spacing={2}>
                  <Grid item>
                     <List>
                        {documents?.[0]?.categories.map(category => (
                           <ListItem
                              key={category.toString()}
                              secondaryAction={
                                 <IconButton edge="end" aria-label="delete" onClick={() => deleteCategories({ id: user.uid, category })}>
                                    <DeleteIcon />
                                 </IconButton>
                              }
                           >
                              <ListItemText primary={category} />
                           </ListItem>
                        ))}
                     </List>
                  </Grid>

                  <Grid item>
                     <Field
                        name="categories"
                        component={TextFormField}
                        InputProps={{ endAdornment: <button type="submit" disabled={isSubmitting} className="btn">Add</button> }}
                     />
                  </Grid>
                  <Grid item>
                     {error && <p>{error}</p>}
                  </Grid>
               </Grid>
            </Form>
         </FormikProvider>
         <div className="sidebar">
            <Link className='btn' to="/">Go Back</Link>
         </div>
      </Container>
   );
}
