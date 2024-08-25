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

type Document = {
  id: string;
  uid?: string;
  displayName?: string;
  categories?: string[];
};

type CollectionReturn = {
  documents: Array<Document>;
  categories?: string[];
  error: string | null;
};

const useCollection = (
  collectionName: string,
  _query?: [string, WhereFilterOp, string],
  _orderBy?: [string, "asc" | "desc"]
): CollectionReturn => {
  const [documents, setDocuments] = useState<Array<Document>>([]);
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
        const results: Array<Document> = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
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
