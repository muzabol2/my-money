import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthType } from '../enums/AuthType';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';

export const useUpdateProfile = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const { dispatch } = useAuthContext();
   const { user } = useAuthContext();
   const history = useHistory();

   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);

   const updateProfile = async (email, displayName, password, passwordConfirm, currentPassword) => {
      if (password !== passwordConfirm) {
         return setError("Passwords do not match");
      }

      const promises = [];
      setIsPending(true);
      setError("");

      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);

      await user.reauthenticateWithCredential(credential)
         .then(async () => {
            if (email !== user.email) {
               promises.push(await updateEmail(email));
            }
            if (password) {
               promises.push(await updatePassword(password));
            };

            if (displayName !== user.displayName) {
               promises.push(await updateDisplayName(displayName));
            }
         })
         .catch((error) => {
            console.log("error", error);
            setIsPending(false);
            return setError("Current password typed incorrectly");
         });

      Promise.all(promises)
         .then(() => {
            dispatch({ type: AuthType.LOGIN, payload: user });

            if (!isCancelled) {
               setIsPending(false);
               setError(null);
            }
            history.push("/");
         })
         .catch((err) => {
            if (!isCancelled) {
               console.log("Failed to update account", err.message);
               setIsPending(false);
               setError("Failed to update account");
            }
         });
   }

   const updateEmail = async (email) =>
      await user.updateEmail(email);

   const updatePassword = async (password) =>
      await user.updatePassword(password);

   const updateDisplayName = async (displayName) =>
      await user.updateProfile({ displayName });

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { updateProfile, error, isPending };
}
