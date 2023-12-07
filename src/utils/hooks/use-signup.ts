import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "config";

import { useFirestore } from "utils";

import {
  AuthProcessStatus,
  StatusState as S,
  StatusMessages as M,
} from "models";
import { COLLECTION_USERS, INITIAL_AUTH_STATUS } from "consts";

export const useSignup = () => {
  const { addUser } = useFirestore(COLLECTION_USERS);
  const [status, setStatus] = useState<AuthProcessStatus>(INITIAL_AUTH_STATUS);
  const [verificationMail, setVerificationMail] = useState(false);

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setStatus({ state: S.PENDING, message: M.EMPTY });

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        updateProfile(auth.currentUser, { displayName });

        // create a user file with default categories
        await addUser(displayName, auth.currentUser.uid);

        sendEmailVerification(auth.currentUser);
      }
      setVerificationMail(true);
      signOut(auth);
      setStatus({ state: S.FULFILLED, message: M.USER_ACCOUNT_CREATED });
    } catch (error) {
      setStatus({ state: S.REJECTED, message: M.WRONG_CREDENTIALS });
    }
  };

  return { signup, status, verificationMail };
};
