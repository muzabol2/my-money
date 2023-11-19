import {
   createUserWithEmailAndPassword,
   sendEmailVerification,
   signOut,
   updateProfile
} from 'firebase/auth';
import { useState } from 'react';

import { auth } from 'config';
import { useFirestore } from 'hooks';

export const useSignup = () => {
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const [verificationMail, setVerificationMail] = useState(false);
   const { addUser } = useFirestore('users');

   const signup = async (email, password, displayName) => {
      setError(null);
      setIsPending(true);

      try {
         await createUserWithEmailAndPassword(auth, email, password);
         updateProfile(auth.currentUser, { displayName });

         // create a user file with default categories
         await addUser(displayName, auth.currentUser.uid);

         sendEmailVerification(auth.currentUser);
         setVerificationMail(true);
         signOut(auth);
      } catch (error) {
         console.error(error);
         setError(error.message);
      } finally {
         setIsPending(false);
      }
   }

   return { signup, error, isPending, verificationMail };
}
