import { useEffect, useState } from "react";

import { AuthService } from "services";

import { useAuthContext } from "hooks";

import { AuthType as AT, Status, StatusState as S } from "models";

export const useUpdateProfile = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const [status, setStatus] = useState<Status>({ state: S.IDLE, message: "" });

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

    setStatus({ state: S.PENDING, message: "" });

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
        message: "Profile updated!",
      });

      dispatch({ type: AT.LOGIN, payload: user });
    } catch (error) {
      const message = (error as Error).message;

      setStatus({ state: S.REJECTED, message });
    } finally {
      if (!isCancelled) {
        setStatus({ state: S.IDLE, message: "" });
      }
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { updateUserProfile, status };
};
