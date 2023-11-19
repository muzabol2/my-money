import { useContext } from 'react';

import { AuthContext } from 'context';

export const useAuthContext = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw Error("useAuthContext must be inside an AuthContextProvider");
   }

   return context;
}
