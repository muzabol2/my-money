import { useEffect, useState } from 'react';
import { AuthType } from '../enums/AuthType';
import { auth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const useGoogleSignIn = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [isGooglePending, setIsGooglePending] = useState(false);
   const [googleError, setGoogleError] = useState(null);
   const { dispatch } = useAuthContext();

   const googleSignIn = () => {
      setGoogleError(null);
      setIsGooglePending(true);

      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
         .then(res => {
            dispatch({ type: AuthType.LOGIN, payload: res.user });
         })
         .catch((error) => {
            console.error(error);
            setGoogleError(error.message);
         })
         .finally(() => {
            if (!isCancelled) {
               setIsGooglePending(false);
            }
         });
   };

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { googleSignIn, googleError, isGooglePending };
}
