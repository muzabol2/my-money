import { Field, Form, FormikProvider, useFormik } from "formik";

import { validateYupSchemaMultiErrors, updateSchema } from "utils";
import { useAuthContext, useUpdateProfile } from "hooks";
import { BelowTextBox, ColorButton, TextFormField } from "components";
import { PagesTexts as PT, ButtonsTexts as BT } from "enums";

import {
  StyledContainer,
  StyledErrorMsg,
  StyledFormContainer,
  StyledSuccessMsg,
  StyledWrapper,
} from "./styled";

const UpdateProfile = () => {
  const { user } = useAuthContext();
  const { updateUserProfile, error, isPending, success } = useUpdateProfile();

  const updateProfileFormFields = [
    { label: "Display name", name: "displayName", type: "text" },
    { label: "Email", name: "email", type: "text" },
    { label: "Current password", name: "currentPassword", type: "password" },
    { label: "Password", name: "password", type: "password" },
    {
      label: "Password confirmation",
      name: "passwordConfirm",
      type: "password",
    },
  ];

  const updateProfileBelowTexts = [{ name: "", link: "/", linkName: BT.BACK }];

  const updateProfileFormik = useFormik({
    initialValues: {
      displayName: user.displayName,
      email: user.email,
      currentPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, updateSchema),
    onSubmit: (values) => {
      updateUserProfile(
        values.displayName,
        values.password,
        values.currentPassword
      );
      resetForm();
    },
  });

  const { resetForm, handleSubmit } = updateProfileFormik;

  return (
    <StyledWrapper>
      <StyledFormContainer>
        {user.providerData[0].providerId === "google.com" ? (
          <p>{PT.CAN_NOT_CHANGE_PROFILE}</p>
        ) : (
          <FormikProvider value={updateProfileFormik}>
            <Form onSubmit={handleSubmit}>
              <StyledContainer>
                {updateProfileFormFields.map((field) => (
                  <Field
                    key={field.name}
                    component={TextFormField}
                    {...field}
                  />
                ))}

                {!isPending ? (
                  <ColorButton type="submit">{BT.UPDATE}</ColorButton>
                ) : (
                  <ColorButton disabled>{BT.LOADING}</ColorButton>
                )}
                {error && <StyledErrorMsg>{error}</StyledErrorMsg>}
                {success && <StyledSuccessMsg>{success}</StyledSuccessMsg>}
              </StyledContainer>
            </Form>
          </FormikProvider>
        )}
      </StyledFormContainer>
      <BelowTextBox texts={updateProfileBelowTexts} />
    </StyledWrapper>
  );
};

export default UpdateProfile;
