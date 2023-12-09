import { useFormik } from "formik";

import { useSignup, signupSchema, validateYupSchemaMultiErrors } from "utils";

import { FormFieldNames as N } from "models";

export const useHelpers = () => {
  const { signup, status, verificationMail } = useSignup();

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

  return { status, verificationMail, signupFormik };
};
