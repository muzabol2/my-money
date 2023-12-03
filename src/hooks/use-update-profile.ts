import { useEffect, useState } from "react";

import { AuthService } from "services";

import { useAuthContext } from "context";

import {
  AuthProcessStatus,
  AuthType as AT,
  StatusState as S,
  StatusMessages as M,
} from "models";

export const useUpdateProfile = () => {
  const { user, dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const [status, setStatus] = useState<AuthProcessStatus>({
    state: S.IDLE,
    message: M.EMPTY,
  });

  const updateUserProfile = async ({
    displayName,
    newPass,
    password,
  }: {
    displayName: string;
    newPass: string;
    password: string;
  }) => {
    const promises: Promise<void>[] = [];

    setStatus({ state: S.PENDING, message: M.EMPTY });

    if (!user) {
      setStatus({
        state: S.REJECTED,
        message: M.NO_USER_LOGGED_IN,
      });

      return;
    }

    try {
      await AuthService.reauthenticate(user, password);

      if (newPass) {
        promises.push(AuthService.updatePassword(user, newPass));
      }

      if (displayName !== user.displayName) {
        promises.push(AuthService.updateDisplayName(user, displayName));
      }

      await Promise.all(promises);

      setStatus({
        state: S.FULFILLED,
        message: M.PROFILE_UPDATED,
      });

      dispatch({ type: AT.LOGIN, payload: user });
    } catch (error) {
      const message = (error as Error).message;

      setStatus({ state: S.REJECTED, message });
    } finally {
      if (!isCancelled) {
        setStatus({ state: S.IDLE, message: M.EMPTY });
      }
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { updateUserProfile, status };
};
