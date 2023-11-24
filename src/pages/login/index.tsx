import { Field, Form, FormikProvider, useFormik } from "formik";
import GoogleButton from "react-google-button";

import { loginSchema } from "utils";
import { useGoogleSignIn, useLogin } from "hooks";

import { PagesTexts as PT, ButtonsTexts as BT } from "enums";
import { LOGIN_BELOW_TEXTS, LOGIN_FORM_FIELDS } from "consts";

import {
  BelowTextBox,
  ColorButton,
  Separator,
  TextFormField,
} from "components";

import {
  StyledContainer,
  StyledErrorMsg,
  StyledFormContainer,
  StyledSubtitle,
  StyledTitle,
  StyledWrapper,
} from "./styled";

const Login = () => {
  const { login, error, isPending } = useLogin();
  const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => login(email, password),
  });

  const { handleSubmit } = loginFormik;

  return (
    <StyledWrapper>
      <StyledFormContainer>
        <FormikProvider value={loginFormik}>
          <Form onSubmit={handleSubmit}>
            <StyledContainer>
              <StyledTitle>{PT.TITLE}</StyledTitle>
              <StyledSubtitle>{PT.SUBTITLE}</StyledSubtitle>

              {LOGIN_FORM_FIELDS.map((field) => (
                <Field key={field.name} component={TextFormField} {...field} />
              ))}

              {!isPending ? (
                <ColorButton type="submit">{BT.LOGIN}</ColorButton>
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
      </StyledFormContainer>

      <BelowTextBox texts={LOGIN_BELOW_TEXTS} />
    </StyledWrapper>
  );
};

export default Login;
