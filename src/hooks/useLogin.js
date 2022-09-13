import { useEffect, useState } from 'react';
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
         
         dispatch({ type: 'LOGIN', payload: res.user });

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

   return { login, error, isPending };
}
