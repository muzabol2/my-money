import GoogleButton from "react-google-button";
import { Field, Form, FormikProvider, useFormik } from "formik";

import { signupSchema, validateYupSchemaMultiErrors } from "utils";
import { useGoogleSignIn, useSignup } from "hooks";

import {
  ButtonsTexts as BT,
  PagesTexts as PT,
  FormFieldNames as N,
  StatusState as S,
} from "models";
import { SIGNUP_BELOW_TEXTS, SIGN_UP_FORM_FIELDS } from "consts";

import { BelowTextBox, TextFormField } from "components";

import * as $ from "./styled";

const Signup = () => {
  const { signup, isPending, error, verificationMail } = useSignup();
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

  const { handleSubmit } = signupFormik;

  return (
    <$.StyledWrapper>
      <$.StyledFormContainer>
        {verificationMail ? (
          <$.StyledSuccessMsg>{PT.PLEASE_CONFIRM}</$.StyledSuccessMsg>
        ) : (
          <FormikProvider value={signupFormik}>
            <Form onSubmit={handleSubmit}>
              <$.StyledContainer>
                <$.StyledTitle>{PT.CREATE_PROFILE}</$.StyledTitle>

                {SIGN_UP_FORM_FIELDS.map((field) => (
                  <Field
                    key={field.name}
                    component={TextFormField}
                    {...field}
                  />
                ))}

                {!isPending ? (
                  <$.StyledButton type="submit">{BT.SIGN_UP}</$.StyledButton>
                ) : (
                  <$.StyledButton disabled>{BT.LOADING}</$.StyledButton>
                )}

                {error && <$.StyledErrorMsg>{error}</$.StyledErrorMsg>}

                <$.StyledSubtitle>{PT.OR}</$.StyledSubtitle>

                <GoogleButton
                  style={{ width: "220px" }}
                  label="Login with Google"
                  onClick={googleSignIn}
                  disabled={googleStatus.state === S.PENDING}
                />
                {googleStatus.state === S.REJECTED && (
                  <$.StyledErrorMsg>{googleStatus.message}</$.StyledErrorMsg>
                )}
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
