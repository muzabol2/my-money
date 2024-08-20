import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile } from "firebase/auth";

import { auth } from "config";

import { getToastMsg } from "utils/toast-msg";

import { StatusMessages as M, PagesTexts as PT } from "models";
import { COLLECTION_USERS } from "consts";
import { useFirestore } from "./useFirestore";

export const useSignup = () => {
  const { addUser } = useFirestore(COLLECTION_USERS);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        updateProfile(auth.currentUser, { displayName });

        // create a user file with default categories
        await addUser(displayName, auth.currentUser.uid);

        sendEmailVerification(auth.currentUser);
      }
      signOut(auth);
      getToastMsg(PT.PLEASE_CONFIRM);
    } catch (error) {
      getToastMsg(M.WRONG_CREDENTIALS);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};
