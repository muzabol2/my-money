import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getToastMsg } from "utils/toast-msg";

import { auth } from "config";

import { useAuthContext } from "context";

import { AuthType as AT, StatusMessages as M } from "models";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (!res.user.emailVerified) {
          signOut(auth);
          getToastMsg(M.EMAIL_NOT_VERIFIED);

          return;
        }

        dispatch({ type: AT.LOGIN, payload: res.user });
      })
      .catch(() => {
        getToastMsg(M.WRONG_CREDENTIALS);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { login, isLoading };
};
