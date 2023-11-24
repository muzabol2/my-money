import * as yup from "yup";

export const updateSchema = yup.object().shape({
  currentPassword: yup.string().required("Required"),
  displayName: yup
    .string()
    .min(5, "5-20 characters")
    .max(20, "5-20 characters")
    .required("Required"),
  password: yup
    .string()
    .min(5, "\u2022 Min 5 characters or more\n")
    .matches(/[a-z]+/, "\u2022 One lowercase character\n")
    .matches(/[A-Z]+/, "\u2022 One uppercase character\n")
    .matches(/[@$!%*#?&]+/, "\u2022 One special character (@$!%*#?&)\n")
    .matches(/\d+/, "\u2022 One number"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
