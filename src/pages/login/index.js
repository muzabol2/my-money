import { Field, Form, FormikProvider, useFormik } from "formik";
import { GoogleButton } from "react-google-button";

import { loginSchema } from "utils";
import { useGoogleSignIn, useLogin } from "hooks";
import {
  BelowTextBox,
  ColorButton,
  Separator,
  TextFormField,
} from "components";
import {
  PagesTexts as PT,
  ButtonsTexts as BT,
  RedirectPaths as P,
} from "enums";

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

  const loginFormFields = [
    { label: "Email", name: "email", type: "text" },
    { label: "Password", name: "password", type: "password" },
  ];

  const loginBelowTexts = [
    { name: PT.HAVE_ACCOUNT, link: P.SIGNUP, linkName: PT.SIGNUP },
    {
      name: PT.WHY_THIS_PROJECT,
      link: P.INSPIRATION,
      linkName: PT.INSPIRATION,
    },
  ];

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => login(values.email, values.password),
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

              {loginFormFields.map((field) => (
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
      <BelowTextBox texts={loginBelowTexts} />
    </StyledWrapper>
  );
};

export default Login;
