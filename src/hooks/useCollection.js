import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import { db } from "config";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const queryRef = useRef(_query).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (queryRef) {
      ref = query(ref, where(...queryRef));
    }
    if (orderByRef) {
      ref = query(ref, orderBy(...orderByRef));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.error(error);
        setError("could not fetch the data");
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryRef, orderByRef]);

  return { documents, error };
};
