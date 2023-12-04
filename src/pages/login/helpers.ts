import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useFormik } from "formik";

import { auth } from "config";

import { useAuthContext } from "context";

import { loginSchema } from "utils";

import {
  AuthProcessStatus,
  AuthType as AT,
  StatusState as S,
  StatusMessages as M,
  FormFieldNames as N,
} from "models";
import { INITIAL_AUTH_STATUS } from "consts";

export const useHelpers = () => {
  const { dispatch } = useAuthContext();
  const [, setIsCancelled] = useState(false);
  const [status, setStatus] = useState<AuthProcessStatus>(INITIAL_AUTH_STATUS);

  const loginFormik = useFormik({
    initialValues: {
      [N.email]: "",
      [N.password]: "",
    },
    validationSchema: loginSchema,
    onSubmit: ({ email, password }) => login(email, password),
  });

  const login = async (email: string, password: string) => {
    setStatus({ state: S.PENDING, message: M.EMPTY });

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (!res.user.emailVerified) {
          setStatus({ state: S.REJECTED, message: M.EMAIL_NOT_VERIFIED });
          signOut(auth);

          return;
        }

        setStatus({ state: S.FULFILLED, message: M.USER_LOGGED_IN });
        dispatch({ type: AT.LOGIN, payload: res.user });
      })
      .catch(() => {
        setStatus({ state: S.REJECTED, message: M.WRONG_CREDENTIALS });
      });
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { status, loginFormik };
};
