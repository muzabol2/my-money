import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";

import { auth } from "config";

import { useAuthContext } from "context";

import {
  AuthProcessStatus,
  AuthType as AT,
  StatusState as S,
  StatusMessages as M,
  AuthAction,
} from "models";
import { INITIAL_AUTH_STATUS } from "consts";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [status, setStatus] = useState<AuthProcessStatus>(INITIAL_AUTH_STATUS);
  const isCancelled = useRef(false);

  useEffect(
    () => () => {
      isCancelled.current = true;
    },
    []
  );

  const safeDispatch = (action: AuthAction) => {
    if (!isCancelled.current) dispatch(action);
  };

  const safeSetStatus = (status: AuthProcessStatus) => {
    if (!isCancelled.current) setStatus(status);
  };

  const logout = async () => {
    safeSetStatus({ state: S.PENDING, message: M.EMPTY });

    signOut(auth)
      .then(() => {
        safeSetStatus({ state: S.FULFILLED, message: M.USER_LOGGED_OUT });
        safeDispatch({ type: AT.LOGOUT });
      })
      .catch(() => {
        safeSetStatus({ state: S.REJECTED, message: M.WRONG_CREDENTIALS });
      });
  };

  return { logout, status };
};
