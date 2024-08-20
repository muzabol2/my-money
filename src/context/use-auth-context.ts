import { useContext } from "react";
import { ErrorMessages as E } from "models";
import { AuthContext } from "./auth-context";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(E.INVALID_CONTEXT);
  }

  return context;
};

export { useAuthContext };
