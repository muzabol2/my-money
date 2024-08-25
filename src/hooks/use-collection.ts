import {
  Query,
  QueryConstraint,
  WhereFilterOp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "config";
import { ErrorMessages as E } from "models";

type CollectionReturn<T> = {
  documents: T[];
  categories?: string[];
  error: string | null;
};

const useCollection = <T extends Record<string, any>>(
  collectionName: string,
  _query?: [string, WhereFilterOp, string],
  _orderBy?: [string, "asc" | "desc"]
): CollectionReturn<T> => {
  const [documents, setDocuments] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  const categories = documents?.[0]?.categories;

  // If we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const queryRef = useRef(_query).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    let ref: Query = collection(db, collectionName);

    if (queryRef) {
      ref = query(ref, where(...queryRef) as QueryConstraint);
    }
    if (orderByRef) {
      ref = query(ref, orderBy(...orderByRef) as QueryConstraint);
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const results: T[] = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as unknown as T);
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.error(error);
        setError(E.COULD_NOT_FETCH_DATA);
      }
    );

    return () => unsubscribe();
  }, [collectionName, queryRef, orderByRef]);

  return { documents, categories, error };
};

export { useCollection };
