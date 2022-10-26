import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useFormik } from 'formik';
import { updateSchema } from './validateUpdateProfile';
import { validateYupSchemaMultiErrors } from '../validateFormikMultiErrors';
import './UpdateProfile.css';

export default function UpdateProfile() {
   const { user } = useAuthContext();
   const { updateUserProfile, error, isPending, success } = useUpdateProfile();

   const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
      initialValues: {
         currentPassword: "",
         displayName: user.displayName,
         password: "",
         passwordConfirm: "",
      },
      validate: values => validateYupSchemaMultiErrors(values, updateSchema),
      onSubmit: values => updateUserProfile(values.displayName, values.password, values.currentPassword)
   });

   return (
      <div className="container">
         <div className="content">
            <form onSubmit={handleSubmit} className="update-form">
               {user.providerData[0].providerId === 'google.com' ?
                  <p>{"You are sign in with Google account. You can't change your profile data from here."}</p>
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
                        <span>Current password:</span>
                        <input
                           id="currentPassword"
                           type="password"
                           value={values.currentPassword}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={errors.currentPassword && touched.currentPassword ? "input-error" : ""}
                        />
                        {errors.currentPassword && touched.currentPassword && (<p>{errors.currentPassword}</p>)}
                     </label>
                     <label>
                        <span>New password:</span>
                        <input
                           id="password"
                           type="password"
                           value={values.password}
                           placeholder="Leave blank to keep the same"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={errors.password && touched.password ? "input-error" : ""}
                        />
                        {errors.password && touched.password && (<p>{errors.password}</p>)}
                     </label>
                     <label>
                        <span>Confirm new password:</span>
                        <input
                           id="passwordConfirm"
                           type="password"
                           value={values.passwordConfirm}
                           placeholder="Leave blank to keep the same"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={errors.passwordConfirm && touched.passwordConfirm ? "input-error" : ""}
                        />
                        {errors.passwordConfirm && touched.passwordConfirm && (<p>{errors.passwordConfirm}</p>)}
                     </label>
                     {!isPending && <button type="submit" disabled={isSubmitting} className="btn">Update</button>}
                     {isPending && <button className="btn" disabled>Loading</button>}
                     {error && <p className="firebase-error">{error}</p>}
                     {success && <p className="firebase-success">{success}</p>}
                  </>
               }
            </form>
         </div>
         <div className="sidebar">
            <Link className='btn' to="/">Go Back</Link>
         </div>
      </div>
   );
}
