import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const updateSchema = yup.object().shape({
   currentPassword: yup
      .string()
      .required("Required"),
   displayName: yup
      .string()
      .min(5)
      .max(20)
      .required("Required"),
   password: yup
      .string()
      .matches(passwordRules, { message: "Please create a stronger password" }),
   passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
});
