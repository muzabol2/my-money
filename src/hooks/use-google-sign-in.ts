import { GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "config";
import { COLLECTION_USERS, INITIAL_AUTH_STATUS } from "consts";
import { useAuthContext } from "context";
import { AuthType as AT, AuthProcessStatus, StatusMessages as M, StatusState as S } from "models";
import { useFirestore } from "./use-firestore";

const useGoogleSignIn = () => {
  const { dispatch } = useAuthContext();
  const { addUser } = useFirestore(COLLECTION_USERS);

  const [, setIsCancelled] = useState(false);
  const [status, setStatus] = useState<AuthProcessStatus>(INITIAL_AUTH_STATUS);

  const googleSignIn = async () => {
    setStatus({ state: S.PENDING, message: M.EMPTY });

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      setStatus({ state: S.FULFILLED, message: M.USER_LOGGED_IN });

      dispatch({ type: AT.LOGIN, payload: result.user });

      const additionalUserInfo = getAdditionalUserInfo(result);

      if (additionalUserInfo?.isNewUser) {
        // create a user file with default categories
        await addUser(result.user.displayName, result.user.uid);
      }
    } catch (error) {
      setStatus({ state: S.REJECTED, message: M.WRONG_CREDENTIALS });
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { googleSignIn, googleStatus: status };
};

export { useGoogleSignIn };
