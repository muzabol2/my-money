import { useFormik } from "formik";

import { useAuthContext } from "context";

import {
  updateSchema,
  validateYupSchemaMultiErrors,
  useUpdateProfile,
} from "utils";

import { FormFieldNames as N } from "models";

export const useHelpers = () => {
  const { user } = useAuthContext();
  const { updateUserProfile, isLoading } = useUpdateProfile();

  const isGoogleProvider = user?.providerData[0].providerId === "google.com";

  const updateProfileFormik = useFormik({
    initialValues: {
      [N.displayName]: user?.displayName,
      [N.email]: user?.email,
      [N.password]: "",
      [N.newPass]: "",
      [N.newPassConfirm]: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, updateSchema),
    onSubmit: ({ displayName, newPass, password }) => {
      updateUserProfile({ displayName: `${displayName}`, newPass, password });
    },
  });

  return {
    isLoading,
    updateProfileFormik,
    isGoogleProvider,
  };
};
