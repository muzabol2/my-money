import GoogleButton from "react-google-button";
import { Field, Form, FormikProvider } from "formik";

import { useHelpers } from "./helpers";

import { ButtonsTexts as BT, PagesTexts as PT, StatusState as S } from "models";
import { SIGNUP_BELOW_TEXTS, SIGN_UP_FORM_FIELDS } from "consts";

import { BelowTextBox, TextFormField } from "components";

import * as $ from "./styled";

const Signup = () => {
  const {
    consts: {
      style,
      isPending,
      error,
      verificationMail,
      googleStatus,
      signupFormik,
    },
    funcs: { googleSignIn },
  } = useHelpers();

  return (
    <$.StyledWrapper>
      <$.StyledFormContainer>
        {verificationMail ? (
          <$.StyledSuccessMsg>{PT.PLEASE_CONFIRM}</$.StyledSuccessMsg>
        ) : (
          <FormikProvider value={signupFormik}>
            <Form onSubmit={signupFormik.handleSubmit}>
              <$.StyledContainer>
                <$.StyledTitle>{PT.CREATE_PROFILE}</$.StyledTitle>

                {SIGN_UP_FORM_FIELDS.map((field) => (
                  <Field
                    key={field.name}
                    component={TextFormField}
                    {...field}
                  />
                ))}

                {!isPending ? (
                  <$.StyledButton type="submit">{BT.SIGN_UP}</$.StyledButton>
                ) : (
                  <$.StyledButton disabled>{BT.LOADING}</$.StyledButton>
                )}

                {error && <$.StyledErrorMsg>{error}</$.StyledErrorMsg>}

                <$.StyledSubtitle>{PT.OR}</$.StyledSubtitle>

                <GoogleButton
                  style={style}
                  onClick={googleSignIn}
                  disabled={googleStatus.state === S.PENDING}
                />
                {googleStatus.state === S.REJECTED && (
                  <$.StyledErrorMsg>{googleStatus.message}</$.StyledErrorMsg>
                )}
              </$.StyledContainer>
            </Form>
          </FormikProvider>
        )}
      </$.StyledFormContainer>

      <BelowTextBox texts={SIGNUP_BELOW_TEXTS} />
    </$.StyledWrapper>
  );
};

export default Signup;
