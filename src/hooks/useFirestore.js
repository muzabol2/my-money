import { useEffect, useReducer, useState } from "react";

import { actions, initialState, reducer } from "store";

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(reducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const allFunctions = actions(collectionName, dispatch, isCancelled);

  //cleanup function
  useEffect(() => () => setIsCancelled(true), []);

  return { ...allFunctions, response };
};
