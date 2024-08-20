import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { auth } from "config";

import { AuthAction, AuthContextType, AuthState, AuthType as T, ErrorMessages as E } from "models";

export const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case T.LOGIN:
      return { ...state, user: action.payload };
    case T.LOGOUT:
      return { ...state, user: null };
    case T.AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };

    default:
      return state;
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(E.INVALID_CONTEXT);
  }

  return context;
};
