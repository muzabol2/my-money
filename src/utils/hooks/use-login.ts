import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "config";

import { useAuthContext } from "context";

import {
  AuthProcessStatus,
  AuthType as AT,
  StatusState as S,
  StatusMessages as M,
} from "models";
import { INITIAL_AUTH_STATUS } from "consts";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [, setIsCancelled] = useState(false);
  const [status, setStatus] = useState<AuthProcessStatus>(INITIAL_AUTH_STATUS);

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

  return { login, status };
};
