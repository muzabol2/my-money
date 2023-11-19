import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { AuthType } from '../enums/AuthType';
import { auth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const logout = async () => {
      setError(null);
      setIsPending(true);

      signOut(auth)
         .then(() => {
            dispatch({ type: AuthType.LOGOUT });
         })
         .catch((error) => {
            console.error(error);
            setError(error.message);
         })
         .finally(() => {
            setIsPending(false);
         });
   }

   return { logout, error, isPending };
}
