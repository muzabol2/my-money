import { useEffect, useState } from 'react';
import { AuthType } from '../enums/AuthType';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const logout = async () => {
      setError(null);
      setIsPending(true);

      try {
         await projectAuth.signOut();
         
         dispatch({ type: AuthType.LOGOUT });

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

   return { logout, error, isPending };
}
