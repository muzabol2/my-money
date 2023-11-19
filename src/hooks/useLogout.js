import { signOut } from 'firebase/auth';
import { useState } from 'react';

import { auth } from 'config';
import { AuthType } from 'enums';
import { useAuthContext } from 'hooks';

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
