import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react';

import { auth } from 'config';
import { AuthType as AT } from 'enums';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
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
}

export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, {
      user: null,
      authIsReady: false
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
}
