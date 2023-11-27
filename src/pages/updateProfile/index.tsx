import { Field, Form, FormikProvider } from "formik";

import { useHelpers } from "./helpers";

import { PagesTexts as PT, ButtonsTexts as BT } from "models";
import { GO_BACK_BELOW_TEXTS, UPDATE_PROFILE_FORM_FIELDS } from "consts";

import { BelowTextBox, TextFormField } from "components";

import * as $ from "./styled";

const UpdateProfile = () => {
  const {
    error,
    isPending,
    success,
    updateProfileFormik,
    isGoogleProvider,
    handleSubmit,
  } = useHelpers();

  if (isGoogleProvider) {
    return (
      <$.StyledWrapper>
        <$.StyledFormContainer>
          {PT.CAN_NOT_CHANGE_PROFILE}
        </$.StyledFormContainer>

        <BelowTextBox texts={GO_BACK_BELOW_TEXTS} />
      </$.StyledWrapper>
    );
  }

  if (isPending) {
    return <$.StyledWrapper>{PT.LOADING}</$.StyledWrapper>;
  }

  return (
    <$.StyledWrapper>
      <$.StyledFormContainer>
        <FormikProvider value={updateProfileFormik}>
          <Form onSubmit={handleSubmit}>
            <$.StyledContainer>
              <$.StyledTitle>{PT.CREATE_PROFILE}</$.StyledTitle>
              {UPDATE_PROFILE_FORM_FIELDS.map((field) => (
                <Field key={field.name} component={TextFormField} {...field} />
              ))}

              <$.StyledButton type="submit">{BT.UPDATE}</$.StyledButton>

              {error && <$.StyledErrorMsg>{error}</$.StyledErrorMsg>}
              {success && <$.StyledSuccessMsg>{success}</$.StyledSuccessMsg>}
            </$.StyledContainer>
          </Form>
        </FormikProvider>
      </$.StyledFormContainer>

      <BelowTextBox texts={GO_BACK_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default UpdateProfile;
