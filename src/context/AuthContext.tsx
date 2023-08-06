import { createContext, useEffect, useReducer } from "react";
import { AuthType } from "../enums/AuthType";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

type Action = {
  type: AuthType;
  payload: any; // Adjust this to the payload type of your actions
};

type AuthContextType = {
  user: User | null;
  authIsReady: boolean;
  dispatch?: React.Dispatch<Action>; // Adjust this to the actual action type
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const authReducer = (state: AuthContextType, action: Action) => {
  switch (action.type) {
    case AuthType.LOGIN:
      return { ...state, user: action.payload };
    case AuthType.LOGOUT:
      return { ...state, user: null };
    case AuthType.AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: AuthType.AUTH_IS_READY, payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
