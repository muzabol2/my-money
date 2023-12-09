import { Field, Form, FormikProvider, useFormik } from "formik";

import { useSignup, signupSchema, validateYupSchemaMultiErrors } from "utils";

import {
  ButtonsTexts as BT,
  PagesTexts as PT,
  FormFieldNames as N,
} from "models";
import { SIGNUP_BELOW_TEXTS, SIGN_UP_FORM_FIELDS } from "consts";

import { BelowTextBox, GoogleSignIn, TextFormField } from "components";

import * as $ from "./styled";

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
    return <$.StyledWrapper>{PT.LOADING}</$.StyledWrapper>;
  }

  return (
    <$.StyledWrapper>
      <$.StyledFormContainer>
        <FormikProvider value={signupFormik}>
          <Form onSubmit={signupFormik.handleSubmit}>
            <$.StyledContainer>
              <$.StyledTitle>{PT.CREATE_PROFILE}</$.StyledTitle>

              {SIGN_UP_FORM_FIELDS.map((field) => (
                <Field key={field.name} component={TextFormField} {...field} />
              ))}

              <$.StyledButton type="submit">{BT.SIGN_UP}</$.StyledButton>

              <$.StyledSubtitle>{PT.OR}</$.StyledSubtitle>

              <GoogleSignIn />
            </$.StyledContainer>
          </Form>
        </FormikProvider>
      </$.StyledFormContainer>

      <BelowTextBox texts={SIGNUP_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default Signup;
