import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';

export const useSignup = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const [verificationMail, setVerificationMail] = useState(false);

   const signup = async (email, password, passwordConfirm, displayName) => {
      setError(null);
      setIsPending(true);

      if (password !== passwordConfirm) {
         setIsPending(false);
         return setError("Passwords do not match.");
      }

      try {
         const res = await projectAuth.createUserWithEmailAndPassword(email, password);

         if (!res) {
            throw new Error("Could not complate signup.");
         }

         await res.user.updateProfile({ displayName });

         res.user.sendEmailVerification()
            .then(() => {
               setVerificationMail(true);
            })
            .catch(() => {
               throw new Error("Could not complate signup.");
            });

         if (!isCancelled) {
            setIsPending(false);
            setError(null);
         }
      }
      catch (err) {
         if (!isCancelled) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
         }
      }
   }

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { signup, error, isPending, verificationMail };
}
