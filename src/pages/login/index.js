import { Grid, Typography } from "@mui/material";
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
import { PagesTexts as PT, ButtonsTexts as BT } from "enums";

const Login = () => {
  const { login, error, isPending } = useLogin();
  const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

  const loginBelowTexts = [
    { name: PT.HAVE_ACCOUNT, link: "signup", linkName: PT.SIGNUP },
    {
      name: PT.WHY_THIS_PROJECT,
      link: "inspiration",
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
    <>
      <FormikProvider value={loginFormik}>
        <Form onSubmit={handleSubmit} className="form-container">
          <Grid container alignItems="center" justifyContent="center">
            <Grid item mb={1} align="center">
              <Typography
                variant="h5"
                sx={{ fontFamily: "Arial", fontWeight: "bold" }}
              >
                {PT.TITLE}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "Monospace", m: 1 }}
              >
                {PT.SUBTITLE}
              </Typography>
            </Grid>
            <Grid item mb={2}>
              <Field label="Email" name="email" component={TextFormField} />
            </Grid>
            <Grid item mb={2}>
              <Field
                label="Password"
                name="password"
                type="password"
                component={TextFormField}
              />
            </Grid>
            <Grid item>
              {!isPending ? (
                <ColorButton type="submit">{BT.LOGIN}</ColorButton>
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
            </Grid>
            <Grid item>
              {googleError && <p className="firebase-error">{error}</p>}
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
      <BelowTextBox texts={loginBelowTexts} />
    </>
  );
};

export default Login;
