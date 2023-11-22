import { Field, Form, FormikProvider, useFormik } from "formik";
import { GoogleButton } from "react-google-button";

import { signupSchema, validateYupSchemaMultiErrors } from "utils";
import { useGoogleSignIn, useSignup } from "hooks";
import {
  BelowTextBox,
  ColorButton,
  Separator,
  TextFormField,
} from "components";
import {
  ButtonsTexts as BT,
  PagesTexts as PT,
  RedirectPaths as P,
} from "enums";

import {
  StyledWrapper,
  StyledContainer,
  StyledFormContainer,
  StyledTitle,
  StyledSuccessMsg,
  StyledErrorMsg,
} from "./styled";

const Signup = () => {
  const { signup, isPending, error, verificationMail } = useSignup();
  const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

  const signupFormFields = [
    { label: "Display name", name: "displayName", type: "text" },
    { label: "Email", name: "email", type: "text" },
    { label: "Password", name: "password", type: "password" },
    {
      label: "Password confirmation",
      name: "passwordConfirm",
      type: "password",
    },
  ];

  const signUpBelowTexts = [
    { name: PT.HAVE_ACCOUNT, link: P.LOGIN, linkName: PT.LOGIN },
    {
      name: PT.WHY_THIS_PROJECT,
      link: P.INSPIRATION,
      linkName: PT.INSPIRATION,
    },
  ];

  const signupFormik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, signupSchema),
    onSubmit: (values) =>
      signup(values.email, values.password, values.displayName),
  });

  const { handleSubmit } = signupFormik;

  return (
    <StyledWrapper>
      <StyledFormContainer>
        {verificationMail ? (
          <StyledSuccessMsg>{PT.PLEASE_CONFIRM}</StyledSuccessMsg>
        ) : (
          <FormikProvider value={signupFormik}>
            <Form onSubmit={handleSubmit}>
              <StyledContainer>
                <StyledTitle>{PT.CREATE_PROFILE}</StyledTitle>

                {signupFormFields.map((field) => (
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
                {error && <StyledErrorMsg>{error}</StyledErrorMsg>}

                <Separator label="OR" />

                <GoogleButton
                  style={{ width: "220px" }}
                  label="Login with Google"
                  onClick={googleSignIn}
                  disabled={isGooglePending}
                />
                {googleError && <StyledErrorMsg>{error}</StyledErrorMsg>}
              </StyledContainer>
            </Form>
          </FormikProvider>
        )}
      </StyledFormContainer>
      <BelowTextBox texts={signUpBelowTexts} />
    </StyledWrapper>
  );
};

export default Signup;
