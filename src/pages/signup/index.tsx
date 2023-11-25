import GoogleButton from "react-google-button";
import { Field, Form, FormikProvider, useFormik } from "formik";

import { signupSchema, validateYupSchemaMultiErrors } from "utils";
import { useGoogleSignIn, useSignup } from "hooks";

import { ButtonsTexts as BT, PagesTexts as PT } from "enums";
import { SIGNUP_BELOW_TEXTS, SIGN_UP_FORM_FIELDS } from "consts";

import {
  BelowTextBox,
  ColorButton,
  Separator,
  TextFormField,
} from "components";

import * as $ from "./styled";

const Signup = () => {
  const { signup, isPending, error, verificationMail } = useSignup();
  const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

  const signupFormik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
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
                  <ColorButton type="submit">{BT.SIGN_UP}</ColorButton>
                ) : (
                  <ColorButton disabled>{BT.LOADING}</ColorButton>
                )}
                {error && <$.StyledErrorMsg>{error}</$.StyledErrorMsg>}

                <Separator label="OR" />

                <GoogleButton
                  style={{ width: "220px" }}
                  label="Login with Google"
                  onClick={googleSignIn}
                  disabled={isGooglePending}
                />
                {googleError && <$.StyledErrorMsg>{error}</$.StyledErrorMsg>}
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
