import { useFormik } from "formik";

import { loginSchema, useLogin } from "utils";

import { PagesTexts as PT, ButtonsTexts as BT, FormFieldNames as N, LoginValues } from "models";
import { LOGIN_BELOW_TEXTS, LOGIN_FORM_FIELDS } from "consts";

import { FormikForm, BelowTextBox, GoogleSignIn } from "components";

import { StyledFormContainer, StyledText, StyledTitle, StyledWrapper } from "./styled";

const Login = () => {
  const { login, isLoading } = useLogin();

  const loginFormik = useFormik({
    initialValues: {
      [N.email]: "",
      [N.password]: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => login(email, password),
  });

  if (isLoading) {
    return <StyledWrapper>{PT.LOADING}</StyledWrapper>;
  }

  return (
    <StyledWrapper>
      <StyledFormContainer>
        <StyledTitle>{PT.TITLE}</StyledTitle>
        <StyledText>{PT.SUBTITLE}</StyledText>

        <FormikForm<LoginValues> formik={loginFormik} formFields={LOGIN_FORM_FIELDS} buttonText={BT.LOGIN} />

        <StyledText>{PT.OR}</StyledText>

        <GoogleSignIn />
      </StyledFormContainer>
      <BelowTextBox texts={LOGIN_BELOW_TEXTS} />
    </StyledWrapper>
  );
};

export default Login;
