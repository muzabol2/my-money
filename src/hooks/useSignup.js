import { useState} from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const signup = async (email, password, displayName) => {
      setError(null);
      setIsPending(true);

      try {
         const res = await projectAuth.createUserWithEmailAndPassword(email, password);

         if (!res) {
            throw new Error("Could not complate signup.");
         }

         await res.user.updateProfile({ displayName });

         dispatch({ type: 'LOGIN', payload: res.user });

         setIsPending(false);
         setError(false);
      } 
      catch (err) {
         console.log(err.message);
         setError(err.message);
         setIsPending(false);
      }
   }

   return { signup, error, isPending };
}
