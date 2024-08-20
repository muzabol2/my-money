import { useFormik } from "formik";
import { BelowTextBox, FormikForm, GoogleSignIn } from "components";
import { SIGNUP_BELOW_TEXTS, SIGN_UP_FORM_FIELDS } from "consts";
import { useSignup } from "hooks";
import { ButtonsTexts as BT, FormFieldNames as N, PagesTexts as PT, SignupValues } from "models";
import { signupSchema, validateYupSchemaMultiErrors } from "utils";
import { StyledFormContainer, StyledText, StyledTitle, StyledWrapper } from "./styled";

const Signup = () => {
  const { signup, isLoading } = useSignup();

  const signupFormik = useFormik({
    initialValues: {
      [N.displayName]: "",
      [N.email]: "",
      [N.password]: "",
      [N.passConfirm]: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, signupSchema),
    onSubmit: ({ email, password, displayName }) => {
      signup(email, password, displayName);
      signupFormik.resetForm();
    },
  });

  if (isLoading) {
    return <StyledWrapper>{PT.LOADING}</StyledWrapper>;
  }

  return (
    <StyledWrapper>
      <StyledFormContainer>
        <StyledTitle>{PT.CREATE_PROFILE}</StyledTitle>

        <FormikForm<SignupValues> formik={signupFormik} formFields={SIGN_UP_FORM_FIELDS} buttonText={BT.SIGN_UP} />

        <StyledText>{PT.OR}</StyledText>

        <GoogleSignIn />
      </StyledFormContainer>
      <BelowTextBox texts={SIGNUP_BELOW_TEXTS} />
    </StyledWrapper>
  );
};

export default Signup;
