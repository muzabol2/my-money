import { useFormik } from "formik";

import {
  useGoogleSignIn,
  useSignup,
  signupSchema,
  validateYupSchemaMultiErrors,
} from "utils";

import { FormFieldNames as N } from "models";

export const useHelpers = () => {
  const { signup, status, verificationMail } = useSignup();
  const { googleSignIn, googleStatus } = useGoogleSignIn();

  const signupFormik = useFormik({
    initialValues: {
      [N.displayName]: "",
      [N.email]: "",
      [N.password]: "",
      [N.passConfirm]: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, signupSchema),
    onSubmit: ({ email, password, displayName }) =>
      signup(email, password, displayName),
  });

  const style = { width: "220px" };

  return {
    consts: {
      style,
      status,
      verificationMail,
      googleStatus,
      signupFormik,
    },
    funcs: { googleSignIn },
  };
};
