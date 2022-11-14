import { useEffect, useState } from 'react';
import { AuthType } from '../enums/AuthType';
import { auth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { useFirestore } from './useFirestore';

export const useGoogleSignIn = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [isGooglePending, setIsGooglePending] = useState(false);
   const [googleError, setGoogleError] = useState(null);
   const { dispatch } = useAuthContext();
   const { addUser } = useFirestore('users');

   const googleSignIn = async () => {
      setGoogleError(null);
      setIsGooglePending(true);

      try {
         const provider = new GoogleAuthProvider();
         const result = await signInWithPopup(auth, provider);
         dispatch({ type: AuthType.LOGIN, payload: result.user });

         const { isNewUser } = getAdditionalUserInfo(result);
         if (isNewUser) {
            // create a user file with default categories
            console.log("result", result);
            console.log("displayName", result.user.displayName);
            console.log("uid", result.user.uid);

            await addUser(result.user.displayName, result.user.uid);
         }

      } catch (error) {
         console.error(error);
         setGoogleError(error.message);
      } finally {
         if (!isCancelled) {
            setIsGooglePending(false);
         }
      }
   };

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { googleSignIn, googleError, isGooglePending };
}
