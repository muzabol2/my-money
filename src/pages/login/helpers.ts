import { useFormik } from "formik";

import { loginSchema, useGoogleSignIn, useLogin } from "utils";

import { FormFieldNames as N } from "models";

export const useHelpers = () => {
  const { login, status } = useLogin();
  const { googleSignIn, googleStatus } = useGoogleSignIn();

  const loginFormik = useFormik({
    initialValues: {
      [N.email]: "",
      [N.password]: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => login(email, password),
  });

  const style = { width: "220px" };

  return {
    consts: { style, status, googleStatus, loginFormik },
    funcs: { googleSignIn },
  };
};
