import { useLogin } from "../../hooks/useLogin";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { loginSchema } from "./validateLogin";
import { GoogleButton } from "react-google-button";
import { useGoogleSignIn } from "../../hooks/useGoogleSignIn";
import Separator from "../../components/Separator";
import { TextFormField } from "../../formFields/TextFormField";
import { Grid, Typography } from "@mui/material";
import { ColorButton } from "../../components/ColorButton";
import { Link } from "react-router-dom";

export default function Login() {
  const { login, error, isPending } = useLogin();
  const { googleSignIn, googleError, isGooglePending } = useGoogleSignIn();

  const loginFornik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => login(values.email, values.password),
  });

  const { handleSubmit } = loginFornik;

  return (
    <>
      <FormikProvider value={loginFornik}>
        <Form onSubmit={handleSubmit} className="form-container">
          <Grid container alignItems="center" justifyContent="center">
            <Grid item mb={1} align="center">
              <Typography
                variant="h5"
                sx={{ fontFamily: "Arial", fontWeight: "bold" }}
              >
                Where's my money?!
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "Monospace", m: 1 }}
              >
                Application to help you manage your home budget
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
                <ColorButton type="submit">Login</ColorButton>
              ) : (
                <ColorButton disabled>Loading</ColorButton>
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
      <div className="below-container">
        <Typography sx={{ textAlign: "center" }}>
          Don't have an account? <Link to="signup">Sign up</Link>
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          Why this project? <Link to="inspiration">Inspiration</Link>
        </Typography>
      </div>
    </>
  );
}
