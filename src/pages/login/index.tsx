import GoogleButton from "react-google-button";
import { Field, Form, FormikProvider, useFormik } from "formik";

import { loginSchema } from "utils";
import { useGoogleSignIn, useLogin } from "hooks";

import {
  PagesTexts as PT,
  ButtonsTexts as BT,
  FormFieldNames as N,
  StatusState as S,
} from "models";
import { LOGIN_BELOW_TEXTS, LOGIN_FORM_FIELDS } from "consts";

import { BelowTextBox, TextFormField } from "components";

import * as $ from "./styled";

const Login = () => {
  const { login, error, isPending } = useLogin();
  const { googleSignIn, googleStatus } = useGoogleSignIn();

  const loginFormik = useFormik({
    initialValues: {
      [N.email]: "",
      [N.password]: "",
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
      </$.StyledFormContainer>

      <BelowTextBox texts={LOGIN_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default Login;
