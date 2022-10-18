import { useEffect, useState } from 'react';
import { AuthType } from '../enums/AuthType';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const login = async (email, passsword) => {
      setError(null);
      setIsPending(true);

      try {
         const res = await projectAuth.signInWithEmailAndPassword(email, passsword);
         
         if (res.user.emailVerified) {
            dispatch({ type: AuthType.LOGIN, payload: res.user });
         }
         else {
            await projectAuth.signOut();
            setIsPending(false);
            return setError("Email not verified.");
         }
         if (!isCancelled) {
            setIsPending(false);
            setError(null);
         }
      }
      catch (error) {
         if (!isCancelled) {
            console.error(error)
            setError(error.message);
            setIsPending(false);
         }
      }
   }

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { login, error, isPending };
}
