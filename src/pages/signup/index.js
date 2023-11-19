import { Grid, Typography } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { GoogleButton } from "react-google-button";
import { Link } from "react-router-dom";

import { signupSchema, validateYupSchemaMultiErrors } from "utils";
import { useGoogleSignIn, useSignup } from "hooks";
import { ColorButton, Separator, TextFormField } from "components";
import { ButtonsTexts as BT, PagesTexts as PT } from "enums";

export default function Signup() {
  const { signup, isPending, error, verificationMail } = useSignup();
  const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

  const signupFormik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validate: (values) => validateYupSchemaMultiErrors(values, signupSchema),
    onSubmit: (values) =>
      signup(values.email, values.password, values.displayName),
  });

  const { handleSubmit } = signupFormik;

  return (
    <>
      <div className="form-container">
        {verificationMail ? (
          <p className="firebase-success">{PT.PLEASE_CONFIRM}</p>
        ) : (
          <FormikProvider value={signupFormik}>
            <Form onSubmit={handleSubmit}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item mb={2} align="left">
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Arial", fontWeight: "bold" }}
                  >
                    Create a profile:
                  </Typography>
                </Grid>
                <Grid item mb={1}>
                  <Field
                    label="Display name"
                    name="displayName"
                    component={TextFormField}
                  />
                </Grid>
                <Grid item mb={1}>
                  <Field label="Email" name="email" component={TextFormField} />
                </Grid>
                <Grid item mb={1}>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={TextFormField}
                  />
                </Grid>
                <Grid item mb={1}>
                  <Field
                    label="Password confirmation"
                    name="passwordConfirm"
                    type="password"
                    component={TextFormField}
                  />
                </Grid>
                <Grid item>
                  {!isPending ? (
                    <ColorButton type="submit">{BT.SIGN_UP}</ColorButton>
                  ) : (
                    <ColorButton disabled>{BT.LOADING}</ColorButton>
                  )}
                </Grid>
                <Grid item>
                  {error && <p className="firebase-error">{error}</p>}
                </Grid>
                <Grid item>
                  <Separator label="OR" />
                  <GoogleButton
                    style={{ width: "220px" }}
                    label="Login with Google"
                    onClick={googleSignIn}
                    disabled={isGooglePending}
                  />
                  {googleError && <p className="firebase-error">{error}</p>}
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        )}
      </div>
      <div className="below-container">
        <Typography sx={{ textAlign: "center" }}>
          {PT.HAVE_ACCOUNT} <Link to="login">{PT.LOGIN}</Link>
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          {PT.WHY_THIS_PROJECT}
          <Link to="inspiration">{PT.INSPIRATION}</Link>
        </Typography>
      </div>
    </>
  );
}
