import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const logout = async () => {
      setError(null);
      setIsPending(true);

      try {
         await projectAuth.signOut();
         dispatch({ type: 'LOGOUT'});

         setIsPending(false);
         setError(null);
      }
      catch (err) {
         console.log(err.message);
         setError(err.message);
         setIsPending(false);
      }
   }

   return { logout, error, isPending }
}
