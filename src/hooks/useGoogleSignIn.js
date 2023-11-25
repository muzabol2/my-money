import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "config";

import { useAuthContext, useFirestore } from "hooks";

import { AuthType as AT } from "enums";

export const useGoogleSignIn = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);
  const [googleError, setGoogleError] = useState(null);
  const { dispatch } = useAuthContext();
  const { addUser } = useFirestore("users");

  const googleSignIn = async () => {
    setGoogleError(null);
    setIsGooglePending(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      dispatch({ type: AT.LOGIN, payload: result.user });

      const { isNewUser } = getAdditionalUserInfo(result);

      if (isNewUser) {
        // create a user file with default categories
        await addUser(result.user.displayName, result.user.uid);
      }
    } catch (error) {
      console.error(error);
      setGoogleError(error.message);
    } finally {
      if (!isCancelled) {
        setIsGooglePending(false);
      }
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { googleSignIn, googleError, isGooglePending };
};
