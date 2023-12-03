import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "config";

import { useAuthContext } from "context";

import { useFirestore } from "hooks";

import {
  AuthProcessStatus,
  AuthType as AT,
  StatusState as S,
  StatusMessages as M,
} from "models";
import { COLLECTION_USERS } from "consts";

export const useGoogleSignIn = () => {
  const { dispatch } = useAuthContext();
  const { addUser } = useFirestore(COLLECTION_USERS);

  const [isCancelled, setIsCancelled] = useState(false);
  const [status, setStatus] = useState<AuthProcessStatus>({
    state: S.IDLE,
    message: M.EMPTY,
  });

  const googleSignIn = async () => {
    setStatus({ state: S.PENDING, message: M.EMPTY });

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      dispatch({ type: AT.LOGIN, payload: result.user });

      const additionalUserInfo = getAdditionalUserInfo(result);

      if (additionalUserInfo?.isNewUser) {
        // create a user file with default categories
        await addUser(result.user.displayName, result.user.uid);
      }

      setStatus({
        state: S.FULFILLED,
        message: M.USER_LOGGED_IN,
      });
    } catch (error) {
      console.error(error);
      const message = (error as Error).message;

      setStatus({ state: S.REJECTED, message });
    } finally {
      if (!isCancelled) {
        setStatus({ state: S.IDLE, message: M.EMPTY });
      }
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { googleSignIn, googleStatus: status };
};
