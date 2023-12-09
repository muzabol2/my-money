import { useState, useEffect, useRef } from "react";

import { AuthService } from "services";

import { getToastMsg } from "utils/toast-msg";

import { useAuthContext } from "context";

import { AuthType as AT, AuthAction, StatusMessages as M } from "models";

export const useUpdateProfile = () => {
  const { user, dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
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

  const safeSetIsLoading = (loading: boolean) => {
    if (!isCancelled.current) setIsLoading(loading);
  };

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

    safeSetIsLoading(true);

    if (!user) {
      getToastMsg(M.NO_USER_LOGGED_IN);

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

      safeDispatch({ type: AT.LOGIN, payload: user });
      getToastMsg(M.PROFILE_UPDATED);
    } catch (error) {
      getToastMsg(M.COULD_NOT_UPDATE_PROFILE);
    } finally {
      safeSetIsLoading(false);
    }
  };

  return { updateUserProfile, isLoading };
};
