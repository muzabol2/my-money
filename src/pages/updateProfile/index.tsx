import { Field, Form, FormikProvider, useFormik } from "formik";

import { validateYupSchemaMultiErrors, updateSchema } from "utils";
import { useAuthContext, useUpdateProfile } from "hooks";

import { PagesTexts as PT, ButtonsTexts as BT } from "models";
import { GO_BACK_BELOW_TEXTS, UPDATE_PROFILE_FORM_FIELDS } from "consts";

import { BelowTextBox, TextFormField } from "components";

import * as $ from "./styled";

const UpdateProfile = () => {
  const { user } = useAuthContext();
  const { updateUserProfile, error, isPending, success } = useUpdateProfile();

  const updateProfileFormik = useFormik({
    initialValues: {
      displayName: user.displayName,
      email: user.email,
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, updateSchema),
    onSubmit: ({ displayName, password, currentPassword }) => {
      updateUserProfile(displayName, password, currentPassword);
      resetForm();
    },
  });

  const { resetForm, handleSubmit } = updateProfileFormik;

  return (
    <$.StyledWrapper>
      <$.StyledFormContainer>
        {user.providerData[0].providerId === "google.com" ? (
          <p>{PT.CAN_NOT_CHANGE_PROFILE}</p>
        ) : (
          <FormikProvider value={updateProfileFormik}>
            <Form onSubmit={handleSubmit}>
              <$.StyledContainer>
                {UPDATE_PROFILE_FORM_FIELDS.map((field) => (
                  <Field
                    key={field.name}
                    component={TextFormField}
                    {...field}
                  />
                ))}

                {!isPending ? (
                  <$.StyledButton type="submit">{BT.UPDATE}</$.StyledButton>
                ) : (
                  <$.StyledButton disabled>{BT.LOADING}</$.StyledButton>
                )}
                {error && <$.StyledErrorMsg>{error}</$.StyledErrorMsg>}
                {success && <$.StyledSuccessMsg>{success}</$.StyledSuccessMsg>}
              </$.StyledContainer>
            </Form>
          </FormikProvider>
        )}
      </$.StyledFormContainer>

      <BelowTextBox texts={GO_BACK_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default UpdateProfile;
