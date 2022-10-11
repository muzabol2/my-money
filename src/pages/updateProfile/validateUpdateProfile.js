export const validateUpdateProfile = (values) => {
   const errors = {};
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

   if (!values.displayName) {
      errors.displayName = "Display name is required.";
   }
   else if (values.displayName.length > 20) {
      errors.displayName = "Display name cannot exceed more than 20 characters.";
   }

   if (!values.email) {
      errors.email = "Email is required.";
   }
   else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format.";
   }

   if (!values.currentPassword) {
      errors.currentPassword = "Password is required.";
   }

   if (values.password.length !== 0) {

      if (values.password.length < 6) {
         errors.password = "Password must be at least 6 characters.";
      }
      else if (values.password.length > 10) {
         errors.password = "Password cannot exceed more than 10 characters.";
      }

      if (!values.passwordConfirm) {
         errors.passwordConfirm = "Password confirmation is required.";
      }
      else if (values.password !== values.passwordConfirm) {
         errors.passwordConfirm = "Password confirmation must be the same as password.";
      }
   }
   return errors;
};
