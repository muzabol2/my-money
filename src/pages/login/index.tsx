import GoogleButton from "react-google-button";
import { Field, Form, FormikProvider, useFormik } from "formik";

import { loginSchema } from "utils";
import { useGoogleSignIn, useLogin } from "hooks";

import { PagesTexts as PT, ButtonsTexts as BT } from "models";
import { LOGIN_BELOW_TEXTS, LOGIN_FORM_FIELDS } from "consts";

import { BelowTextBox, TextFormField } from "components";

import * as $ from "./styled";

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
    <$.StyledWrapper>
      <$.StyledFormContainer>
        <FormikProvider value={loginFormik}>
          <Form onSubmit={handleSubmit}>
            <$.StyledContainer>
              <$.StyledTitle>{PT.TITLE}</$.StyledTitle>
              <$.StyledSubtitle>{PT.SUBTITLE}</$.StyledSubtitle>

              {LOGIN_FORM_FIELDS.map((field) => (
                <Field key={field.name} component={TextFormField} {...field} />
              ))}

              {!isPending ? (
                <$.StyledButton type="submit">{BT.LOGIN}</$.StyledButton>
              ) : (
                <$.StyledButton disabled>{BT.LOADING}</$.StyledButton>
              )}

              {error && <$.StyledErrorMsg>{error}</$.StyledErrorMsg>}

              <$.StyledSubtitle>{"OR"}</$.StyledSubtitle>

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
      </$.StyledFormContainer>

      <BelowTextBox texts={LOGIN_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default Login;
