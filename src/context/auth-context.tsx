import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { auth } from "config";

import { AuthType as AT } from "models";

interface State {
  user: User | null;
  authIsReady: boolean;
}
type Action =
  | { type: AT.LOGIN; payload: User }
  | { type: AT.LOGOUT }
  | { type: AT.AUTH_IS_READY; payload: User | null };

type AuthContextType = {
  user: User | null;
  authIsReady: boolean;
  dispatch: React.Dispatch<Action>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case AT.LOGIN:
      return { ...state, user: action.payload };
    case AT.LOGOUT:
      return { ...state, user: null };
    case AT.AUTH_IS_READY:
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
      dispatch({ type: AT.AUTH_IS_READY, payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used within an AuthContextProvider");
  }

  return context;
};
