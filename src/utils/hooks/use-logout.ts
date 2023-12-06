import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "config";

import { useAuthContext } from "context";

import {
  AuthProcessStatus,
  AuthType as AT,
  StatusState as S,
  StatusMessages as M,
} from "models";
import { INITIAL_AUTH_STATUS } from "consts";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [, setIsCancelled] = useState(false);
  const [status, setStatus] = useState<AuthProcessStatus>(INITIAL_AUTH_STATUS);

  const logout = async () => {
    setStatus({ state: S.PENDING, message: M.EMPTY });

    signOut(auth)
      .then(() => {
        setStatus({ state: S.FULFILLED, message: M.USER_LOGGED_OUT });
        dispatch({ type: AT.LOGOUT });
      })
      .catch(() => {
        setStatus({ state: S.REJECTED, message: M.WRONG_CREDENTIALS });
      });
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { logout, status };
};
