import { useFormik } from "formik";
import { BelowTextBox, FormikForm } from "components";
import { GO_BACK_BELOW_TEXTS, UPDATE_PROFILE_FORM_FIELDS } from "consts";
import { useAuthContext } from "context";
import { useUpdateProfile } from "hooks";
import { ButtonsTexts as BT, FormFieldNames as N, PagesTexts as PT, UpdateValues } from "models";
import { updateSchema, validateYupSchemaMultiErrors } from "utils";
import { StyledFormContainer, StyledTitle, StyledWrapper } from "./styled";

const UpdateProfile = () => {
  const { user } = useAuthContext();
  const { updateUserProfile, isLoading } = useUpdateProfile();

  const isGoogleProvider = user?.providerData[0].providerId === "google.com";

  const updateProfileFormik = useFormik({
    initialValues: {
      [N.displayName]: user?.displayName ?? "",
      [N.email]: user?.email ?? "",
      [N.password]: "",
      [N.newPass]: "",
      [N.newPassConfirm]: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, updateSchema),
    onSubmit: ({ displayName, newPass, password }) => {
      updateUserProfile({ displayName: `${displayName}`, newPass, password });
    },
  });

  if (isGoogleProvider) {
    return (
      <StyledWrapper>
        <StyledFormContainer>{PT.CAN_NOT_CHANGE_PROFILE}</StyledFormContainer>

        <BelowTextBox texts={GO_BACK_BELOW_TEXTS} />
      </StyledWrapper>
    );
  }

  if (isLoading) {
    return <StyledWrapper>{PT.LOADING}</StyledWrapper>;
  }

  return (
    <StyledWrapper>
      <StyledFormContainer>
        <StyledTitle>{PT.CREATE_PROFILE}</StyledTitle>

        <FormikForm<UpdateValues>
          formik={updateProfileFormik}
          formFields={UPDATE_PROFILE_FORM_FIELDS}
          buttonText={BT.UPDATE}
        />
      </StyledFormContainer>

      <BelowTextBox texts={GO_BACK_BELOW_TEXTS} />
    </StyledWrapper>
  );
};

export { UpdateProfile };
