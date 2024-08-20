import { useFormik } from "formik";
import { BelowTextBox, FormikForm, GoogleSignIn } from "components";
import { LOGIN_BELOW_TEXTS, LOGIN_FORM_FIELDS } from "consts";
import { useLogin } from "hooks";
import { ButtonsTexts as BT, LoginValues, FormFieldNames as N, PagesTexts as PT } from "models";
import { loginSchema } from "utils";
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

export { Login };
