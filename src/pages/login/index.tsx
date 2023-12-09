import { Field, Form, FormikProvider, useFormik } from "formik";

import { loginSchema, useLogin } from "utils";

import {
  PagesTexts as PT,
  ButtonsTexts as BT,
  FormFieldNames as N,
} from "models";
import { LOGIN_BELOW_TEXTS, LOGIN_FORM_FIELDS } from "consts";

import { BelowTextBox, GoogleSignIn, TextFormField } from "components";

import * as $ from "./styled";

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
    return <$.StyledWrapper>{PT.LOADING}</$.StyledWrapper>;
  }

  return (
    <$.StyledWrapper>
      <$.StyledFormContainer>
        <FormikProvider value={loginFormik}>
          <Form onSubmit={loginFormik.handleSubmit}>
            <$.StyledContainer>
              <$.StyledTitle>{PT.TITLE}</$.StyledTitle>
              <$.StyledSubtitle>{PT.SUBTITLE}</$.StyledSubtitle>

              {LOGIN_FORM_FIELDS.map((field) => (
                <Field key={field.name} component={TextFormField} {...field} />
              ))}

              <$.StyledButton type="submit">{BT.LOGIN}</$.StyledButton>

              <$.StyledSubtitle>{PT.OR}</$.StyledSubtitle>

              <GoogleSignIn />
            </$.StyledContainer>
          </Form>
        </FormikProvider>
      </$.StyledFormContainer>

      <BelowTextBox texts={LOGIN_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default Login;
