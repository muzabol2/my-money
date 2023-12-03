import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "config";

import { useAuthContext } from "context";

import { AuthType as AT } from "models";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res.user.emailVerified) {
          dispatch({ type: AT.LOGIN, payload: res.user });
        } else {
          signOut(auth);
          setError("Email not verified.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        if (!isCancelled) {
          setIsPending(false);
        }
      });
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { login, error, isPending };
};
