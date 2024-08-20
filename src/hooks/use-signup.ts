import { createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "config";
import { COLLECTION_USERS } from "consts";
import { StatusMessages as M, PagesTexts as PT } from "models";
import { getToastMsg } from "utils/toast-msg";
import { useFirestore } from "./useFirestore";

const useSignup = () => {
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

export { useSignup };
