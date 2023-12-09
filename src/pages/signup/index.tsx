import { Field, Form, FormikProvider } from "formik";

import { useHelpers } from "./helpers";

import { ButtonsTexts as BT, PagesTexts as PT, StatusState as S } from "models";
import { SIGNUP_BELOW_TEXTS, SIGN_UP_FORM_FIELDS } from "consts";

import { BelowTextBox, GoogleSignIn, TextFormField } from "components";

import * as $ from "./styled";

const Signup = () => {
  const { status, verificationMail, signupFormik } = useHelpers();

  if (status.state === S.PENDING) {
    return <$.StyledWrapper>{PT.LOADING}</$.StyledWrapper>;
  }

  return (
    <$.StyledWrapper>
      <$.StyledFormContainer>
        {verificationMail ? (
          <$.StyledSuccessMsg>{PT.PLEASE_CONFIRM}</$.StyledSuccessMsg>
        ) : (
          <FormikProvider value={signupFormik}>
            <Form onSubmit={signupFormik.handleSubmit}>
              <$.StyledContainer>
                <$.StyledTitle>{PT.CREATE_PROFILE}</$.StyledTitle>

                {SIGN_UP_FORM_FIELDS.map((field) => (
                  <Field
                    key={field.name}
                    component={TextFormField}
                    {...field}
                  />
                ))}

                <$.StyledButton type="submit">{BT.SIGN_UP}</$.StyledButton>

                {status.state === S.REJECTED && (
                  <$.StyledErrorMsg>{status.message}</$.StyledErrorMsg>
                )}

                <$.StyledSubtitle>{PT.OR}</$.StyledSubtitle>

                <GoogleSignIn />
              </$.StyledContainer>
            </Form>
          </FormikProvider>
        )}
      </$.StyledFormContainer>

      <BelowTextBox texts={SIGNUP_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default Signup;
