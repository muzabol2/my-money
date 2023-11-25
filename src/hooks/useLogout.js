import { useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "config";

import { useAuthContext } from "hooks";

import { AuthType as AT } from "enums";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    signOut(auth)
      .then(() => {
        dispatch({ type: AT.LOGOUT });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return { logout, error, isPending };
};
