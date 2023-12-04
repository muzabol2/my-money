import GoogleButton from "react-google-button";
import { Field, Form, FormikProvider } from "formik";

import { useGoogleSignIn } from "hooks";
import { useHelpers } from "./helpers";

import { PagesTexts as PT, ButtonsTexts as BT, StatusState as S } from "models";
import { LOGIN_BELOW_TEXTS, LOGIN_FORM_FIELDS } from "consts";

import { BelowTextBox, TextFormField } from "components";

import * as $ from "./styled";

const Login = () => {
  const { status, loginFormik } = useHelpers();
  const { googleSignIn, googleStatus } = useGoogleSignIn();

  const { handleSubmit } = loginFormik;

  if (status.state === S.PENDING || googleStatus.state === S.PENDING) {
    return <$.StyledWrapper>{PT.LOADING}</$.StyledWrapper>;
  }

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

              <$.StyledButton type="submit">{BT.LOGIN}</$.StyledButton>

              {status.state === S.REJECTED && (
                <$.StyledErrorMsg>{status.message}</$.StyledErrorMsg>
              )}

              <$.StyledSubtitle>{PT.OR}</$.StyledSubtitle>

              <GoogleButton
                style={{ width: "220px" }}
                label="Log in with Google"
                onClick={googleSignIn}
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
