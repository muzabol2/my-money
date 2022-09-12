import { useState} from "react";
import { projectAuth } from "../firebase/config";

export const useSingnup = () => {
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);

   const signup = async (email, password, displayName) => {
      setError(null);
      setIsPending(true);

      try {
         const res = await projectAuth.createUserWithEmailAndPassword(email, password);
         console.log(res.user);

         if (!res) {
            throw new Error("Could not complate signup.");
         }

         await res.user.updateProfile({ displayName });

         setIsPending(false);
         setError(false);
      } catch (err) {
         console.log(err.message);
         setError(err.message);
         setIsPending(false);
      }
   }

   return { error, isPending, signup };
}
