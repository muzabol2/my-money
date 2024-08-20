import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useReducer } from "react";
import { auth } from "config";
import { AuthContextType, AuthType as T } from "models";
import { authReducer } from "./auth-reducer";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: T.AUTH_IS_READY, payload: user });
      unsub();
    });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
