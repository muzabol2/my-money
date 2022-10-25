import { useState } from 'react';
import { auth } from '../firebase/config';
import {
   createUserWithEmailAndPassword,
   updateProfile,
   signOut,
   sendEmailVerification
} from 'firebase/auth';

export const useSignup = () => {
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const [verificationMail, setVerificationMail] = useState(false);

   const signup = async (email, password, displayName) => {
      setError(null);
      setIsPending(true);

      createUserWithEmailAndPassword(auth, email, password)
         .then(() => {
            updateProfile(auth.currentUser, { displayName });
            sendEmailVerification(auth.currentUser)
               .then(() => {
                  setVerificationMail(true);
                  signOut(auth);
               })
         })
         .catch((error) => {
            console.error(error);
            setError(error.message);
         })
         .finally(() => {
            setIsPending(false);
         });
   }

   return { signup, error, isPending, verificationMail };
}
