import { useContext } from "react";
import { AuthContext } from "./auth-context";
import { ErrorMessages as E } from "models";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(E.INVALID_CONTEXT);
  }

  return context;
};
