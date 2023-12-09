import { useFormik } from "formik";

import { loginSchema, useLogin } from "utils";

import { FormFieldNames as N } from "models";

export const useHelpers = () => {
  const { login, status } = useLogin();

  const loginFormik = useFormik({
    initialValues: {
      [N.email]: "",
      [N.password]: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => login(email, password),
  });

  return { status, loginFormik };
};
