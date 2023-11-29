import { useFormik } from "formik";

import { updateSchema, validateYupSchemaMultiErrors } from "utils";
import { useAuthContext, useUpdateProfile } from "hooks";

import { FormFieldNames as N } from "models";

export const useHelpers = () => {
  const { user } = useAuthContext();
  const { updateUserProfile, status } = useUpdateProfile();

  const isGoogleProvider = user.providerData[0].providerId === "google.com";

  const updateProfileFormik = useFormik({
    initialValues: {
      [N.displayName]: user.displayName,
      [N.email]: user.email,
      [N.password]: "",
      [N.newPass]: "",
      [N.newPassConfirm]: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, updateSchema),
    onSubmit: ({ displayName, newPass, password }) => {
      updateUserProfile({ displayName, newPass, password });
    },
  });

  const { handleSubmit } = updateProfileFormik;

  return {
    status,
    updateProfileFormik,
    isGoogleProvider,
    handleSubmit,
  };
};
