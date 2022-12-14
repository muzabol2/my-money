import { useEffect, useState } from 'react';
import { AuthType } from '../enums/AuthType';
import { useAuthContext } from './useAuthContext';
import {
   EmailAuthProvider,
   reauthenticateWithCredential,
   updatePassword,
   updateProfile
} from "firebase/auth";

export const useUpdateProfile = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const { dispatch } = useAuthContext();
   const { user } = useAuthContext();

   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   const updateUserProfile = async (displayName, password, currentPassword) => {
      const promises = [];
      setIsPending(true);
      setError(null);

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential)
         .then(async () => {
            if (password) {
               promises.push(await updatePassword(user, password));
            };

            if (displayName !== user.displayName) {
               promises.push(await updateProfile(user, { displayName }));
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
         .then(() => {
            dispatch({ type: AuthType.LOGIN, payload: user });

            if (!isCancelled) {
               setIsPending(false);
            }

         });
   }

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { updateUserProfile, error, isPending, success };
}
