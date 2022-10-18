import { useEffect, useState } from 'react';
import { AuthType } from '../enums/AuthType';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';

export const useUpdateProfile = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const { dispatch } = useAuthContext();
   const { user } = useAuthContext();

   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const updateProfile = async (email, displayName, password, currentPassword) => {
      const promises = [];
      setIsPending(true);
      setError(null);

      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);

      await user.reauthenticateWithCredential(credential)
         .then(async () => {
            if (email !== user.email) {
               promises.push(await user.updateEmail(email));
            }
            if (password) {
               promises.push(await user.updatePassword(password));
            };

            if (displayName !== user.displayName) {
               promises.push(await user.updateProfile({ displayName }));
            }
            setSuccess("Profile updated correctly");
         })
         .catch((error) => {
            console.error(error);
            setIsPending(false);
            setSuccess(null);
            return setError(error.message);
         });

      Promise.all(promises)
         .then(prom => {
            dispatch({ type: AuthType.LOGIN, payload: user });

            if (!isCancelled) {
               setIsPending(false);
            }

         });
   }

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { updateProfile, error, isPending, success };
}
