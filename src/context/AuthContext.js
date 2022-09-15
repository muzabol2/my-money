import { createContext, useEffect, useReducer } from 'react';
import { AuthType } from '../enums/AuthType';
import { projectAuth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
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
}

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, {
      user: null,
      authIsReady: false
   });

   useEffect(() => {
      const unsub = projectAuth.onAuthStateChanged((user) => {
         dispatch({ type: AuthType.AUTH_IS_READY, payload: user});
         unsub();
      });
   }, []);
   console.log("AuthContext state:", state);

   return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
}
